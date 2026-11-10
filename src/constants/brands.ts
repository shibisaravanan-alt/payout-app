/**
 * Made-up brands for the onboarding brand picker. Figma only has "Insert Logo Here"
 * placeholders, so these stand in until real brands and logos are provided.
 *
 * `estimatedPayoutMillions` is also made up. All ten add up to $4,822M, the $4.822 B
 * shown in the Figma results screen.
 */
export const BRANDS = [
  { id: 'northwind', name: 'Northwind', estimatedPayoutMillions: 912 },
  { id: 'brightmart', name: 'Brightmart', estimatedPayoutMillions: 1204 },
  { id: 'zephyr-air', name: 'Zephyr Air', estimatedPayoutMillions: 387 },
  { id: 'lumen-mobile', name: 'Lumen Mobile', estimatedPayoutMillions: 655 },
  { id: 'crestline-foods', name: 'Crestline Foods', estimatedPayoutMillions: 241 },
  { id: 'nova-fitness', name: 'Nova Fitness', estimatedPayoutMillions: 118 },
  { id: 'pinecone-coffee', name: 'Pinecone Coffee', estimatedPayoutMillions: 93 },
  { id: 'quanta-tech', name: 'Quanta Tech', estimatedPayoutMillions: 736 },
  { id: 'harbor-bank', name: 'Harbor Bank', estimatedPayoutMillions: 174 },
  { id: 'orbit-games', name: 'Orbit Games', estimatedPayoutMillions: 302 },
] as const;
