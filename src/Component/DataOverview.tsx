import { GoPerson } from "react-icons/go";
import { MdOutlineDriveFileMove } from "react-icons/md";


const DataOverview = () => {
    return (
        <div className="w-11/12 mx-auto pt-16 grid grid-cols-3 gap-8">
            <div className="h-60 rounded-xl p-8 col-span-1" style={{background: 'linear-gradient(50deg, #FFD89A, #FFB88C, #FF6F91, #FF8AAE)',}}>
                <h1 className="text-xl text-[#ffffff] font-medium">Total Client</h1>
                <h1 className="flex gap-1 mt-4 items-end text-[#ffffff] text-7xl font-medium">30 <GoPerson className="text-6xl"/></h1>
            </div>
            <div className="h-60 rounded-xl p-8 col-span-1" style={{background: 'linear-gradient(50deg, #9EC2FF, #7B9FF2, #5E7EE0, #4259C3)',}}>
                <h1 className="text-xl text-[#ffffff] font-medium">Total Project</h1>
                <h1 className="flex gap-1 mt-4 items-end text-[#ffffff] text-7xl font-medium">78 <MdOutlineDriveFileMove className="text-6xl"/></h1>
            </div>
            <div className="h-60 rounded-xl p-8 col-span-1" style={{background: 'linear-gradient(50deg, #B3E7D0, #82DFC6, #52D5B2, #23BB98)',}}>
                <h1 className="text-xl text-[#ffffff] font-medium">Total Client</h1>
                <h1 className="flex gap-1 mt-4 items-end text-[#ffffff] text-7xl font-medium">30</h1>
            </div>
        </div>
    );
};

export default DataOverview;