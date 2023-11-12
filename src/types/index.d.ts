export interface IProjects {
  id: number;
  image: string;
  location: string;
  name: string;
  description: string;
  lastDonation: { time: string; unit: string };
  currentAmount: number;
  goalAmount: number;
  totalDonations: number;
}
