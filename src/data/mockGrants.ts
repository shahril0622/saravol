export interface Grant {
  id: string;
  name: string;
  organization: string;
  category: string[];
  eligibility: string;
  fundingMin: number;
  fundingMax: number;
  deadline: string;
  description: string;
  keywords: string[];
}

export const mockGrants: Grant[] = [
  {
    id: "1",
    name: "Yayasan Hasanah Community Grant",
    organization: "Yayasan Hasanah",
    category: ["Community Development", "Education"],
    eligibility: "Registered NGOs in Malaysia with at least 2 years of operation. Must have valid ROS registration.",
    fundingMin: 10000,
    fundingMax: 50000,
    deadline: "2025-03-31",
    description: "Supporting grassroots community development initiatives across Malaysia with focus on education and empowerment.",
    keywords: ["community", "education", "empowerment", "youth", "development", "training"]
  },
  {
    id: "2",
    name: "Environmental Action Fund",
    organization: "WWF Malaysia",
    category: ["Environment", "Conservation"],
    eligibility: "Environmental NGOs and community groups. Projects must demonstrate measurable environmental impact.",
    fundingMin: 5000,
    fundingMax: 30000,
    deadline: "2025-04-15",
    description: "Funding for conservation projects, environmental education, and sustainable community initiatives.",
    keywords: ["environment", "conservation", "wildlife", "sustainability", "green", "nature", "forest", "marine"]
  },
  {
    id: "3",
    name: "Youth Development Initiative",
    organization: "Ministry of Youth and Sports",
    category: ["Youth", "Education"],
    eligibility: "Youth organizations and NGOs working with individuals aged 15-30. Must be registered with ROS.",
    fundingMin: 15000,
    fundingMax: 100000,
    deadline: "2025-05-01",
    description: "Supporting youth empowerment programs, skills training, and leadership development initiatives.",
    keywords: ["youth", "leadership", "skills", "training", "empowerment", "students", "education"]
  },
  {
    id: "4",
    name: "Disaster Relief Support Grant",
    organization: "MERCY Malaysia",
    category: ["Disaster Relief", "Humanitarian"],
    eligibility: "NGOs with experience in disaster response. Must have established community networks.",
    fundingMin: 20000,
    fundingMax: 150000,
    deadline: "2025-02-28",
    description: "Emergency funding for disaster preparedness, response, and recovery programs.",
    keywords: ["disaster", "relief", "emergency", "flood", "humanitarian", "aid", "recovery"]
  },
  {
    id: "5",
    name: "Food Security Programme",
    organization: "Kechara Soup Kitchen",
    category: ["Food Aid", "Community Development"],
    eligibility: "Organizations running food distribution or food security programs. Must serve underprivileged communities.",
    fundingMin: 8000,
    fundingMax: 40000,
    deadline: "2025-06-30",
    description: "Supporting food banks, community kitchens, and sustainable food security initiatives.",
    keywords: ["food", "hunger", "poverty", "community", "welfare", "nutrition", "aid"]
  },
  {
    id: "6",
    name: "Animal Welfare Support Fund",
    organization: "SPCA Malaysia",
    category: ["Animal Welfare"],
    eligibility: "Registered animal welfare organizations. Must demonstrate proper facility management.",
    fundingMin: 5000,
    fundingMax: 25000,
    deadline: "2025-04-30",
    description: "Funding for animal rescue, rehabilitation, and community education on animal welfare.",
    keywords: ["animal", "welfare", "rescue", "shelter", "pets", "wildlife", "veterinary"]
  },
  {
    id: "7",
    name: "Women Empowerment Grant",
    organization: "Women's Aid Organisation",
    category: ["Women", "Community Development"],
    eligibility: "NGOs focused on women's rights, safety, and economic empowerment. Priority for rural programs.",
    fundingMin: 12000,
    fundingMax: 60000,
    deadline: "2025-05-15",
    description: "Supporting initiatives for women's economic independence, safety, and leadership development.",
    keywords: ["women", "empowerment", "gender", "safety", "economic", "rural", "skills"]
  },
  {
    id: "8",
    name: "Digital Inclusion Initiative",
    organization: "MDEC",
    category: ["Education", "Technology"],
    eligibility: "Organizations providing digital literacy training. Must target underserved communities.",
    fundingMin: 10000,
    fundingMax: 80000,
    deadline: "2025-07-31",
    description: "Bridging the digital divide through technology education and access programs.",
    keywords: ["digital", "technology", "education", "literacy", "internet", "computer", "training"]
  },
  {
    id: "9",
    name: "Indigenous Community Support",
    organization: "JAKOA",
    category: ["Indigenous", "Community Development"],
    eligibility: "Organizations working with Orang Asli and indigenous communities in Sarawak/Sabah.",
    fundingMin: 15000,
    fundingMax: 70000,
    deadline: "2025-03-15",
    description: "Preserving indigenous culture while supporting community development and welfare.",
    keywords: ["indigenous", "orang asli", "culture", "community", "traditional", "heritage", "rural"]
  },
  {
    id: "10",
    name: "Health & Wellness Outreach Grant",
    organization: "Ministry of Health Malaysia",
    category: ["Health", "Community Development"],
    eligibility: "Health-focused NGOs with qualified medical volunteers. Must serve rural or underserved areas.",
    fundingMin: 20000,
    fundingMax: 100000,
    deadline: "2025-08-31",
    description: "Supporting community health programs, medical outreach, and health education initiatives.",
    keywords: ["health", "medical", "wellness", "outreach", "rural", "clinic", "awareness"]
  }
];

export const causeAreas = [
  "Environment",
  "Youth",
  "Education", 
  "Disaster Relief",
  "Food Aid",
  "Animal Welfare",
  "Community Development",
  "Women Empowerment",
  "Health",
  "Indigenous Communities",
  "Technology"
];
