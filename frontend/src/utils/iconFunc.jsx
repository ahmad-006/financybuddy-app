/* eslint-disable react-refresh/only-export-components */
export const ShowPasswordIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white text-2xl md:w-8 md:h-8 w-6 h-6"
  >
    <path
      d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
      fill="white"
    />
    <path
      d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
      fill="white"
    />
  </svg>
);

// Hide Password (Slashed Eye)
export const HidePasswordIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white text-2xl md:w-8 md:h-8 w-6 h-6"
  >
    <path
      d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 8.11 17 5 12 5C10.73 5 9.51 5.2 8.36 5.57L10.17 7.38C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 15.89 7 19 12 19C13.55 19 15.03 18.63 16.38 17.97L16.8 18.4L19.73 21.33L21 20.06L3.27 2.33L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.20 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z"
      fill="currentColor"
    />
  </svg>
);

export const categoryDisplayConfig = {
  food: { icon: "🍕", color: "#36A2EB" },
  "dining out": { icon: "🍽️", color: "#9966FF" },
  shopping: { icon: "🛍️", color: "#FF69B4" },
  housing: { icon: "🏠", color: "#FF6384" },
  utilities: { icon: "💡", color: "#FF9F40" },
  transportation: { icon: "🚗", color: "#FFCE56" },
  entertainment: { icon: "🎬", color: "#4BC0C0" },
  income: { icon: "💰", color: "#4CAF50" },
  philanthropy: { icon: "🤝", color: "#8B008B" },
  healthcare: { icon: "🏥", color: "#DC143C" },
  education: { icon: "🎓", color: "#00BFFF" },
  subscriptions: { icon: "🔁", color: "#FFD700" },
  savings: { icon: "🐷", color: "#008000" },
  default: { icon: "📁", color: "#CCCCCC" },
};

export const getCategoryDisplayConfig = (category) => {
  const lowerCategory = category?.toLowerCase();
  return categoryDisplayConfig[lowerCategory] || categoryDisplayConfig.default;
};

export const getCategoryIcon = (category) => {
  return getCategoryDisplayConfig(category).icon;
};
