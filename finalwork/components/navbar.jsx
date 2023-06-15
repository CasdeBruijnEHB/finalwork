import Image from 'next/image';
import logoGroen from '@/assets/logo/pom_groen.png'
import logoWit from '@/assets/logo/POM_wit.png'
import { Hamburgermenu } from "@/components/hamburgermenu";
import classNames from 'classnames';



export function Navbar({color = 'light'}){

  let colorstyling = classNames({
		'drop-shadow-lg text-sm text-center bg-white text-[#7FB069] flex rounded-xl pl-10 pt-1.5 pb-1.5 pr-10 justify-between w-2/5': color == 'light',
		'drop-shadow-lg text-sm text-center bg-[#7FB069] text-[#0F1A20] flex rounded-xl pl-10 pt-1.5 pb-1.5 pr-10 justify-between w-2/5': color == 'dark',
	});
  
  //<Hamburgermenu/> image ml-4
    return(<>
              <nav className="font-bold">
                 <div className="flex  text-center justify-center p-3 ">
                  <div className={colorstyling}>
                  <p className="flex items-center">Home</p>
                  <p className="flex items-center">About</p>
                  <Image
                  src={color === 'light' ? logoGroen : logoWit}
                  width={30}
                  height={30}
                  alt="Pom Logo"
                 className="flex items-center"
                  
                  />
                  <p className="flex items-center">Contact</p>
                  <p className="flex items-center">Privacy</p>
                </div>
                    
                </div>
              </nav>
        
    
    
    </>)
}