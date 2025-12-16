import { View, Text } from "react-native";

type Props = {
  date: string | Date; // accept ISO string or Date
};

const DateFormatter: React.FC<Props> = ({ date }) => {
  const formatDate = (): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - parsedDate.getTime(); // difference in ms

    const diffSec = Math.floor(diff / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    // Relative time for recent dates
    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 30) return `${diffDay}d ago`;

    // Absolute date for older dates
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const currentYear = now.getFullYear();

    return year === currentYear ? `${day}-${month}` : `${day}-${month}-${year}`;
  };

  return (
    <View>
      <Text className="text-white text-[12px]">{formatDate()}</Text>
    </View>
  );
};

export default DateFormatter;
