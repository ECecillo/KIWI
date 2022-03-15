//Prend en parametre un (ou plusieurs composants wrapés ensembles) et les affiche cote à cote avec un fond dégradé
function FullContent(props){
    const compo = props.compo;
    console.log("affichage : " + compo);
    return(
        <div className='flex flex-row basis-5/6 bg-gradient-to-br from-pink-200 to-cyan-100'>
            {compo}
        </div>
    )
}

export default FullContent;