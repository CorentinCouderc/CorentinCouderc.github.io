import "./Energy.css"

interface EnergyProps {
    valueText: string;
    isOnHUD: boolean;
}

function Energy(props: EnergyProps) {
    const additionalClass = props.isOnHUD ? " hud" : "";

    return (
        <div className={"energy" + additionalClass}>
            <h1 className={additionalClass} id={"energyValueText"}>{props.valueText + " "}</h1>

            <div className={"energy-icon" + additionalClass} />
        </div>
    );
}

export default Energy;