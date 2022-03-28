import NavBarMobile from "../navbarMobile/NavBarMobile";

//Prend en parametre un (ou plusieurs composants wrapés ensembles) et les affiche cote à cote avec un fond dégradé
function FullContent(props){
    const compo = props.compo;
    return(
        <div className="flex flex-col"> 
            <div className='flex flex-row w-full h-full md:basis-5/6 bg-gradient-to-br from-pink-200 to-cyan-100'>
                {compo}
            </div>
            <NavBarMobile/>
        </div>
    )
}

export default FullContent;