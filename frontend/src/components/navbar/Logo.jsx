import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Logo() {
  return (
    <div className="flex gap-2 items-center p-1">
      <FontAwesomeIcon
        icon={faMoneyBill1Wave}
        className="text-blue-600 text-xl"
      />
      <h2 className="font-dancing-script text-2xl sm:text-xl text-gray-900">
        FinancyBuddy
      </h2>
    </div>
  );
}

export default Logo;
