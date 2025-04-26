import { ComboElement } from "../../src/base_files/combo_element";
import { ComboMap } from "../../src/base_files/combo_map"
import { BadInputError } from "../../src/other/custom_errors";

/**
 * This class allows me to debug ComboMap's protected methods
 * without worrying about someone accidentally calling a 
 * Combo Map's protected methods
 */
export class DebugComboMap extends ComboMap {

    /* ------------------------ CONSTRUCTOR ------------------------ */

    // This constructor basically bypasses the ComboMap constructor!
    // This is because I want to put any map or data into the debug map
    // while preservinig its methods!
    constructor() {
        
        ComboMap.canCreateDebugMap = true;
        super();
        ComboMap.canCreateDebugMap = false;

    }

    /* -------------------- GETTERS AND SETTERS -------------------- */

    public override getNameToIdMap(): Map<string, number> {
        return super.getNameToIdMap();
    }

    public override getIdToObjMap(): Map<number, ComboElement> {
        return super.getIdToObjMap();
    }
    public override getRowToIdsMap(): Map<number, number[]> {
        return super.getRowToIdsMap();
    }

    public override setNameToIdMap(map: Map<string, number>){
        super.setNameToIdMap(map);
    }

    public override setIdToObjMap(map: Map<number, ComboElement>){
        super.setIdToObjMap(map);
    }

    public override setRowToIdsMap(map: Map<number, number[]>){
        super.setRowToIdsMap(map);
    }


    /* -------------------------- METHODS -------------------------- */

    public updateComboElementRelations() {
        super.updateComboElementRelations();
    }

}//DebugComboMap

