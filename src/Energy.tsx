import "./Energy.css"

interface EnergyProps {
    valueText: string;
}

function Energy(props: EnergyProps) {

    return (
        <div className={"energy"}>
            <h1 id={"energyValueText"}>{props.valueText}</h1>

            <div className={"energy-icon"} />
        </div>
    );
}

export default Energy;