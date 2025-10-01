import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TestSelect = () => {
  return (
    <Select defaultValue="monthly">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="animate-none">
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
        <SelectItem value="yearly">Yearly</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TestSelect;