import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-2">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
                        >
                            <img src="./image1.png" className="m-2 rounded-2xl" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-2xl font-bold">Welcome to ChatHub!</h2>
                <p className="text-base-content/60">
                    Start an anonymous conversation by selecting an online user from the sidebar.
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;