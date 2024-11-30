type CaloriesTotalDisplayProps = {
    calories: number,
    text:string
}

export default function CaloriesTotalDisplay({calories, text} : CaloriesTotalDisplayProps) {
return (
<p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-white">{calories}</span>
            {text}
        </p>
)
}