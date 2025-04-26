// Run unit test shit here

// WARNING: DO NOT RUN WITH NODE! OPEN THE TEST RESULTS IN BROWSER!!!

import { toggleFileDataToStrTest } from "./test_base_files/test_file_data_to_str";
import { printMapMethodTesting, toggleGeneratingComboMapTests } from "./test_generate_combo_map/generating_combo_map_tests";
import { toggleTxtToHashMapsTests } from "./test_generate_combo_map/test_txt_to_hash_maps";

console.log('Unit testing ready!');

/* --------- Test toggles --------- */ 
toggleTxtToHashMapsTests(true);
toggleGeneratingComboMapTests(true);

// This unit test does not die in a fire, so I can always check it when needed! :)
//printMapMethodTesting();

// This goes last so I can more easily see it
toggleFileDataToStrTest(false);