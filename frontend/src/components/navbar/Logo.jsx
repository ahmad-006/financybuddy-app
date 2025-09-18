import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function logo() {
  return (
    <div className="flex gap-1 p-1 text-2xl sm:text-xl ">
      <FontAwesomeIcon
        icon={faMoneyBill1Wave}
        style={{ color: "blue" }}
      />
      <h2 className="font-macondo text-2xl sm:text-xl text-white">
        FinancyBuddy
      </h2>
    </div>
  );
}

export default logo;
