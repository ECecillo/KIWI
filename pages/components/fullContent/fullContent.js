import NavBarMobile from '../navbarMobile/NavBarMobile'

//Prend en parametre un (ou plusieurs composants wrapés ensembles) et les affiche cote à cote avec un fond dégradé
function FullContent(props) {
  return (
    <div className="flex h-screen basis-full flex-col md:basis-5/6">
      <div
        className="flex basis-11/12 flex-row bg-gradient-to-br from-[#16a084d5] to-[#FFDEE9] dark:from-[#04043e]
            dark:via-[#3e1339fd] dark:to-[#2e0926e5] md:basis-5/6"
      >
        {props.children}
      </div>
      <NavBarMobile session={props.session} />
    </div>
  )
}

export default FullContent
