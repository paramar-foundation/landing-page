export interface IProject {
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

export interface IDocument {
  name: string;
  displayName: string;
}
