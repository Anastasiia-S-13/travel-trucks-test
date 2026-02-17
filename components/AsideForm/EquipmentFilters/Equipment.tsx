

export default function Equipment() {
    const equipmentOptions = [
            { key: "AC", label: "AC", icon: "icon-AC" },
            { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
            { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
            { key: "TV", label: "TV", icon: "icon-tv" },
            { key: "radio", label: "Radio", icon: "icon-radio" },
            { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
            { key: "microwave", label: "Microwave", icon: "icon-microwave" },
        ];
    return <div>
        <h3>Vehicle equipment</h3>
        <ul>
            {equipmentOptions.map(option => (
                <li key={option.key}><svg width={20} height={20}>
                            <use href={`/sprite/sprite.svg#${option.icon}`} />
                        </svg>{option.label}</li>
            ))}
        </ul>
    </div>
}