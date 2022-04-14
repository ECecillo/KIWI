/** 
 * Fonction utilitaire qui permet de vérifier si une variable passé en paramètre est undefined ou non. 
 * @param variable : any   
 * @return null | valeur initiale variable
*/
export default function checkVariable (variable) {
    if(!variable)
        return null;
    return variable;
}