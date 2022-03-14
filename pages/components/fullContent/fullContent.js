import Content from './../content/Content';
import Rightsection from './../rightSection/RightSection';

function FullContent(){
    return(
        <div className='flex flex-row basis-5/6 bg-gradient-to-br from-pink-200 to-cyan-100'>
            <Content/>
            <Rightsection/>
        </div>
    )
}

export default FullContent;

//bg-gradient-to-br from-pink-200 to-cyan-100