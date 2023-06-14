import Image from 'next/image';
import img from '@/assets/logo/pom_groen.png'
import { Hamburgermenu } from "@/components/hamburgermenu";


export function Navbar(){

  //<Hamburgermenu/> image ml-4
    return(<>
              <nav className="">
                 <div className="flex  text-center justify-center p-3 ">
                  <div className='drop-shadow-lg text-sm text-center bg-white text-[#7FB069] flex rounded-xl pl-10 pt-1.5 pb-1.5 pr-10 justify-between w-2/5'>
                  <p className="flex items-center">Home</p>
                  <p className="flex items-center">About</p>
                  <Image
                  src={img}
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