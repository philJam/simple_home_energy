var openbem = {

    apikey: "",

    'getprojects':function()
    {
        var result = [];
        var apikeystr = ""; if (this.apikey!="") apikeystr = "?apikey="+this.apikey;

        $.ajax({ url: path+"openbem/getprojects.json"+apikeystr, dataType: 'json', async: false, success: function(data) {result = data;} });

        if (result=="") result = [];
        return result;
    },

    'getprojectdetails':function(project_id)
    {
        var result = {};
        var apikeystr = ""; if (this.apikey!="") apikeystr = "?apikey="+this.apikey;

        $.ajax({ url: path+"openbem/getprojectdetails.json", data: "project_id="+project_id, dataType: 'json', async: false, success: function(data) {result = data;} });

        if (result=="") result = {};
        return result;
    },

    'addproject':function(name,description)
    {
        var result = 0;
        $.ajax({ type: 'GET', url: path+"openbem/addproject.json", data: "name="+name+"&description="+description, async: false, success: function(data){result=data;} });
        return result;
    },

    'deleteproject':function(projectid)
    {
        var result = 0;
        $.ajax({ type: 'GET', url: path+"openbem/deleteproject.json", data: "projectid="+projectid, async: false, success: function(data){result=data;} });
        return result;
    },


    'get_scenarios':function(project_id)
    {
        var result = [];
        var apikeystr = ""; if (this.apikey!="") apikeystr = "?apikey="+this.apikey;

        $.ajax({ url: path+"openbem/getscenarios.json"+apikeystr, data: "project_id="+project_id, dataType: 'json', async: false, success: function(data) {result = data;} });

        if (result=="") result = [];
        return result;
    },

    'add_scenario':function(project_id,meta)
    {
        var result = 0;
        $.ajax({ type: 'GET', url: path+"openbem/addscenario.json", data: "project_id="+project_id+"&meta="+JSON.stringify(meta), async: false, success: function(data){result=data;} });
        return result;
    },

    'clone_scenario':function(project_id,scenario_id)
    {
        var result = 0;
        $.ajax({ type: 'GET', url: path+"openbem/clonescenario.json", data: "project_id="+project_id+"&scenario_id="+scenario_id, async: false, success: function(data){result=data;} });
        return result;
    },


    'delete_scenario':function(project_id,scenario_id)
    {
        var result = 0;
        $.ajax({ type: 'GET', url: path+"openbem/deletescenario.json", data: "project_id="+project_id+"&scenario_id="+scenario_id, async: false, success: function(data){result=data;} });
        return result;
    },

    'get_scenario':function(scenario_id)
    {
        var result = {};
        var apikeystr = ""; if (this.apikey!="") apikeystr = "?apikey="+this.apikey;

        $.ajax({ url: path+"openbem/getscenario.json"+apikeystr, data: "scenario_id="+scenario_id, dataType: 'json', async: false, success: function(data) {result = data;} });

        return result;
    },  

    'save_scenario':function(scenario_id,data)
    {
        var inputdata = openbem.extract_inputdata(data);
        var result = {};
        $.ajax({ type: 'POST', url: path+"openbem/savescenario.json", data: "scenario_id="+scenario_id+"&data="+JSON.stringify(inputdata), async: true, success: function(data){} });
        return result;
    },

    'get':function(building)
    {
        var result = {};
        $.ajax({ url: path+"openbem/getmonthly.json", dataType: 'json', data: "building="+building, async: false, success: function(data) {result = data;} });
        return result;
    },

    'save':function(building,data)
    {
        var result = {};
        $.ajax({ type: 'POST', url: path+"openbem/savemonthly.json", data: "building="+building+"&data="+JSON.stringify(data), async: true, success: function(data){} });
        return result;
    },

    'list':function()
    {
        var result = {};
        var apikeystr = ""; //if (feed.apikey!="") apikeystr = "?apikey="+feed.apikey;

        $.ajax({ url: path+"openbem/getlist.json"+apikeystr, dataType: 'json', async: false, success: function(data) {result = data;} });
        return result;
    },

    load: function()
    {
        var result = {};
        $.ajax({url: path+"openbem/load.json", async: false, success: function(data){result = data;} });
        return result;
    },
    
    save: function(data)
    {
        var inputdata = openbem.extract_inputdata(data);
        var result = {};
        $.ajax({ type: 'POST', url: path+"openbem/save.json", data: "data="+JSON.stringify(inputdata), async: true, success: function(data){} });
    },
    
    
    extract_inputdata: function(data)
    {
        var inputdata = {};
        
        inputdata.simple = {};
        
        inputdata.simple.floorarea = data.simple.floorarea;
        inputdata.simple.storeyheight = data.simple.storeyheight;
        inputdata.simple.nooffloors = data.simple.nooffloors;
        inputdata.simple.dwellingtype = data.simple.dwellingtype;
        inputdata.simple.windowarea = data.simple.windowarea;
        inputdata.simple.windowtype = data.simple.windowtype;
        inputdata.simple.wallinsulation = data.simple.wallinsulation;
        inputdata.simple.roofinsulation = data.simple.roofinsulation;
        inputdata.simple.floorinsulation = data.simple.floorinsulation;
        inputdata.simple.draughtiness = data.simple.draughtiness;
        inputdata.simple.heatingsystem = data.simple.heatingsystem;
        inputdata.simple.heatingtargettemperature = data.simple.heatingtargettemperature;
        inputdata.simple.noofoccupants = data.simple.noofoccupants;

        inputdata.region = data.region;
        inputdata.altitude = data.altitude
        inputdata.use_custom_occupancy = data.use_custom_occupancy;
        inputdata.custom_occupancy = data.custom_occupancy;

        inputdata.floors = {};
        for (z in data.floors) {
            inputdata.floors[z] = {area: data.floors[z].area, height: data.floors[z].height};
        }

        inputdata.fabric = {
            elements: []
        };

        for (z in data.fabric.elements) {
            inputdata.fabric.elements[z] = {
                type: data.fabric.elements[z].type,
                name: data.fabric.elements[z].name,
                subtractfrom: data.fabric.elements[z].subtractfrom,
                l: data.fabric.elements[z].l,
                h: data.fabric.elements[z].h,
                area: data.fabric.elements[z].area,
                uvalue: data.fabric.elements[z].uvalue,
            };
            
            if (data.fabric.elements[z].kvalue!=undefined) inputdata.fabric.elements[z].kvalue = data.fabric.elements[z].kvalue;
            if (data.fabric.elements[z].orientation!=undefined) inputdata.fabric.elements[z].orientation = data.fabric.elements[z].orientation;
            if (data.fabric.elements[z].overshading!=undefined) inputdata.fabric.elements[z].overshading = data.fabric.elements[z].overshading;
            if (data.fabric.elements[z].g!=undefined) inputdata.fabric.elements[z].g = data.fabric.elements[z].g;
            if (data.fabric.elements[z].gL!=undefined) inputdata.fabric.elements[z].gL = data.fabric.elements[z].gL;
            if (data.fabric.elements[z].ff!=undefined) inputdata.fabric.elements[z].ff = data.fabric.elements[z].ff;
        }

        // Ventilation
        inputdata.ventilation = {
            number_of_chimneys: data.ventilation.number_of_chimneys,
            number_of_openflues: data.ventilation.number_of_openflues,
            number_of_intermittentfans: data.ventilation.number_of_intermittentfans,
            number_of_passivevents: data.ventilation.number_of_passivevents,
            number_of_fluelessgasfires: data.ventilation.number_of_fluelessgasfires,
            
            air_permeability_test: data.ventilation.air_permeability_test,
            air_permeability_value: data.ventilation.air_permeability_value,
            
            dwelling_construction: data.ventilation.dwelling_construction,
            suspended_wooden_floor: data.ventilation.suspended_wooden_floor,
            draught_lobby: data.ventilation.draught_lobby,
            percentage_draught_proofed: data.ventilation.percentage_draught_proofed,
            number_of_sides_sheltered: data.ventilation.number_of_sides_sheltered,
            ventilation_type: data.ventilation.ventilation_type,
            system_air_change_rate: data.ventilation.system_air_change_rate,
            balanced_heat_recovery_efficiency: data.ventilation.balanced_heat_recovery_efficiency
        };
        
        
        // LAC
        inputdata.use_LAC = data.use_LAC;
        inputdata.LAC = {
            LLE: data.LAC.LLE,
            L: data.LAC.L,
            reduced_internal_heat_gains: data.LAC.reduced_internal_heat_gains
        };
        
        inputdata.use_generation = data.use_generation;
        inputdata.generation = data.generation;
        
        inputdata.currentenergy = {
            electric_annual_kwh: data.currentenergy.electric_annual_kwh,
            storageheaters_annual_kwh: data.currentenergy.storageheaters_annual_kwh,
            waterheating_annual_kwh: data.currentenergy.waterheating_annual_kwh,
            electriccar_annual_kwh: data.currentenergy.electriccar_annual_kwh,
            heatpump_annual_kwh: data.currentenergy.heatpump_annual_kwh,
            woodlogs_annual_m3: data.currentenergy.woodlogs_annual_m3,
            woodpellets_annual_m3: data.currentenergy.woodpellets_annual_m3,
            oil_annual_L: data.currentenergy.oil_annual_L,
            gas_annual_m3: data.currentenergy.gas_annual_m3,
            LPG_annual_L: data.currentenergy.LPG_annual_L,
            bottledgas_annual_kg: data.currentenergy.bottledgas_annual_kg,
            
            electriccar2_annual_miles: data.currentenergy.electriccar2_annual_miles,
            electriccar2_milesperkwh: data.currentenergy.electriccar2_milesperkwh,
            
            car1_annual_miles: data.currentenergy.car1_annual_miles,
            car1_mpg: data.currentenergy.car1_mpg,
            
            car2_annual_miles: data.currentenergy.car2_annual_miles,
            car2_mpg: data.currentenergy.car2_mpg,

            car3_annual_miles: data.currentenergy.car3_annual_miles,
            car3_mpg: data.currentenergy.car3_mpg,
            
            motorbike_annual_miles: data.currentenergy.motorbike_annual_miles,
            motorbike_mpg: data.currentenergy.motorbike_mpg,
            
            bus_miles: data.currentenergy.bus_miles,
            train_miles: data.currentenergy.train_miles, 
            boat_miles: data.currentenergy.boat_miles,
            plane_miles: data.currentenergy.plane_miles
        };
        
        // Waterheating
        inputdata.use_water_heating = data.use_water_heating;
        inputdata.water_heating = {
            low_water_use_design: data.water_heating.low_water_use_design,
            instantaneous_hotwater: data.water_heating.instantaneous_hotwater,
            solar_water_heating: data.water_heating.solar_water_heating,
            pipework_insulated_fraction: data.water_heating.pipework_insulated_fraction,
            declared_loss_factor_known: data.water_heating.declared_loss_factor_known,
            manufacturer_loss_factor: data.water_heating.manufacturer_loss_factor,
            storage_volume: data.water_heating.storage_volume,
            temperature_factor_a: data.water_heating.temperature_factor_a,
            loss_factor_b: data.water_heating.loss_factor_b,
            volume_factor_b: data.water_heating.volume_factor_b,
            temperature_factor_b: data.water_heating.temperature_factor_b,
            community_heating: data.water_heating.community_heating,
            hot_water_store_in_dwelling: data.water_heating.hot_water_store_in_dwelling,
            contains_dedicated_solar_storage_or_WWHRS: data.water_heating.contains_dedicated_solar_storage_or_WWHRS,
            hot_water_control_type: data.water_heating.hot_water_control_type
        };
        
        inputdata.use_SHW = data.use_SHW;
        inputdata.SHW = {
            A: data.SHW.A,
            n0: data.SHW.n0,
            a1: data.SHW.a1,
            a2: data.SHW.a2,
            inclination: data.SHW.inclination,
            orientation: data.SHW.orientation,
            overshading: data.SHW.overshading,
            Vs: data.SHW.Vs,
            combined_cylinder_volume: data.SHW.combined_cylinder_volume
        };
        
        inputdata.use_appliancelist = data.use_appliancelist;
        inputdata.appliancelist = {list:[]};
        for (z in data.appliancelist.list) {
            inputdata.appliancelist.list[z] = {
                name: data.appliancelist.list[z].name,
                power: data.appliancelist.list[z].power,
                hours: data.appliancelist.list[z].hours
            }
        }
        
        // Temperature
        inputdata.temperature = {
            responsiveness: data.temperature.responsiveness,
            target: data.temperature.target,
            control_type: data.temperature.control_type,
            living_area: data.temperature.living_area
        };
        
        // Space heating
        inputdata.space_heating = {
            use_utilfactor_forgains: data.space_heating.use_utilfactor_forgains
        }

        // Energy systems
        inputdata.energy_systems = {}
        for (z in data.energy_systems) {
            inputdata.energy_systems[z] = [];
            
            for (i in data.energy_systems[z])
            {
                inputdata.energy_systems[z].push({
                    system: data.energy_systems[z][i].system,
                    fraction: data.energy_systems[z][i].fraction,
                    efficiency: data.energy_systems[z][i].efficiency
                });
            }
            
        }
        
        // Fuels
        inputdata.fuels = data.fuels;
    
        return inputdata;
    }
}
