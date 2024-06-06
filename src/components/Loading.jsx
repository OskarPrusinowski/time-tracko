import React from "react";

function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-fontColor"></div>
        </div>
    );
}

export default Loading;
