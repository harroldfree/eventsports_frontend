import header from '../assets/header.png'
function Header () {
    
    return (
        <div className="flex justify-around items-center bg-neutral-200 ">
            <div>
                <h1 className="text-3xl font-bold ">Donnez vie à votre <br /> passion sportive</h1>
                <p className="mb-3 mt-3">Participer ou organiser un évènement</p>

                <button className="w-44 h-8 text-sm text-white bg-black rounded-md ">Créer un évènement</button>
            </div>
            <img className=" w-[350px] h-[350px] " src= {header} alt="" />

        </div>
    )
}



export default Header