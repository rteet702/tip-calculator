import { FormEvent, KeyboardEvent, useState } from "react";
import styles from "./TipCalculator.module.css";

export function TipCalculator() {
    const [bill, setBill] = useState("");
    const [selectedPercent, setSelectedPercent] = useState<number | string>();
    const [people, setPeople] = useState(1);

    const percentages = [5, 10, 15, 25, 50, "Custom"];

    let calculatedPercentPerPerson =
        typeof selectedPercent === "number"
            ? (Number(bill) / people) * (selectedPercent / 100)
            : 0;

    let calculatedTotalPerPerson =
        Number(bill) / people + calculatedPercentPerPerson;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {}

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (
            isNaN(Number(event.key)) &&
            event.key !== "Backspace" &&
            event.key !== "Delete"
        ) {
            event.preventDefault();
        }
    }

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setBill(event.currentTarget.value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.left}>
                {/* Bill Amount */}
                <div className={styles.inputGroup}>
                    <label htmlFor="billAmount">Bill</label>
                    <span className={styles.currencyContainer}>
                        <input
                            type="text"
                            id="billAmount"
                            className={styles.billInput}
                            value={bill}
                            min={0}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <i className={styles.inputIcon}>$</i>
                        <p className={styles.numberDisplay}>
                            {Number(bill).toFixed(2).toLocaleString()}
                        </p>
                    </span>
                </div>
                {/* Tip Percentage */}
                <div className={styles.inputGroup}>
                    <label htmlFor="tipPercent">Select Tip %</label>
                    <div className={styles.selectGroup} id="tipPercent">
                        {percentages.map((percentage, idx) => (
                            <div
                                key={idx}
                                className={
                                    selectedPercent === percentage
                                        ? styles.percentBoxActive
                                        : styles.percentBoxInactive
                                }
                                onClick={() => setSelectedPercent(percentage)}
                            >
                                {percentage !== "Custom"
                                    ? `${percentage}%`
                                    : `${percentage}`}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Number of People */}
                <div className={styles.inputGroup}>
                    <label htmlFor="numberOfGuests">Number of People</label>
                    <input
                        type="number"
                        id="numberOfGuests"
                        className={styles.peopleInput}
                        value={people}
                        onChange={(e) => setPeople(e.target.valueAsNumber)}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <div>
                    <div className={styles.totalsContainer}>
                        <p className={styles.totalsText}>
                            Tip Amount <span>/ person</span>
                        </p>
                        <p className={styles.totalsDisplay}>
                            ${calculatedPercentPerPerson.toFixed(2)}
                        </p>
                    </div>
                    <div className={styles.totalsContainer}>
                        <p className={styles.totalsText}>
                            Total <span>/ person</span>
                        </p>
                        <p className={styles.totalsDisplay}>
                            ${calculatedTotalPerPerson.toFixed(2)}
                        </p>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedPercent(undefined);
                        setBill("");
                        setPeople(1);
                    }}
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
