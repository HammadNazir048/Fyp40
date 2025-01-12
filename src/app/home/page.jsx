import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import Logout from "@/components/Logout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InputPanel from "@/components/InputPanel";
import NavBar from "@/components/NavBar";
import { Gallery } from "@/components/Gallery";
import App from "@/components/App";
import Sidebar from "@/components/Sidebar";

const HomePage = async () => {
    const session = await auth();
    if (!session?.user) redirect("/");

    return (
        <div className="flex flex-col h-screen">
            {/* NavBar at the top */}
            <NavBar />

            <div className="flex flex-1 mt-10">
                {/* Sidebar on the left */}
                <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] bg-gray-800 text-white duration-300 z-10">
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className="flex-1 ml-[250px] p-4 overflow-y-auto duration-300"> {/* Adjust the margin-left to match the width of the Sidebar */}
                    <div className="flex flex-col items-center">
                        {session?.user?.name && session?.user?.image ? (
                            <>
                                <h1 className="text-3xl my-2">
                                    Welcome, {session?.user?.name}
                                </h1>
                                <Image
                                    src={session?.user?.image}
                                    alt={session?.user?.name}
                                    width={72}
                                    height={72}
                                    className="rounded-full"
                                />
                            </>
                        ) : (
                            <>
                                <h1 className="text-3xl my-2 text-white">
                                    Welcome, {session?.user?.name}
                                </h1>
                                <h1 className="mb-2 mt-4 text-2xl my-2 text-white">
                                    Enter your Script to Get Relevant Images
                                </h1>
                            </>
                        )}

                        {/* App component (InputPanel) */}
                        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mt-4">
                            <App />
                        </div>

                        {/* Gallery */}
                            <Gallery />
                        {/* Logout button */}
                        <Logout />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
