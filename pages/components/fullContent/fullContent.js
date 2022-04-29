import NavBarMobile from "../navbarMobile/NavBarMobile";

//Prend en parametre un (ou plusieurs composants wrapés ensembles) et les affiche cote à cote avec un fond dégradé
function FullContent(props){
    return(
        <div className="flex flex-col h-screen basis-full md:basis-5/6"> 
            <div className='flex flex-row basis-11/12 md:basis-5/6 bg-gradient-to-br from-[#16a084d5] to-[#FFDEE9]
            dark:from-[#04043e] dark:via-[#3e1339fd] dark:to-[#2e0926e5]'>
                {props.children}
            </div>
            <NavBarMobile session={props.session}/>
        </div>
    )
}

export default FullContent;