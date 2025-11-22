import React from 'react'

export default function Loading(): React.JSX.Element {
    return (
        <div className="flex items-center justify-center">
            <div
                className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
            ></div>

        </div>
    )
}
