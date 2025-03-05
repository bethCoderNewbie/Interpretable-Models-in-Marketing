import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from './lib/utils'; // Assuming you have this utility for clsx/tailwind-merge

function InterpretableModelsSlide() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(60);
  const [distance, setDistance] = useState(5.0);
  const [timeOfDay, setTimeOfDay] = useState('Afternoon');
  const [weekend, setWeekend] = useState(true);
  const [hasChildren, setHasChildren] = useState(false);
  const [previousVisits, setPreviousVisits] = useState(2);
  const [showResults, setShowResults] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [pollAnswer, setPollAnswer] = useState(null);
  
  // Rules for the interactive tree nodes
  const nodes = [
    { id: 1, rule: "IF (time = lunchtime) AND (location = near restaurant) THEN coupon acceptance = 73%" },
    { id: 2, rule: "IF (customer = previously purchased) AND (day = weekend) THEN email open rate = 42%" },
    { id: 3, rule: "IF (browsing time > 5min) AND (cart items > 2) THEN discount offer acceptance = 65%" }
  ];

  // Model comparison data
  const modelComparisonData = [
    { name: 'Trust', interpretable: 90, blackbox: 40 },
    { name: 'Transparency', interpretable: 95, blackbox: 30 },
    { name: 'Actionability', interpretable: 85, blackbox: 50 },
    { name: 'Refinement', interpretable: 80, blackbox: 45 },
    { name: 'Engagement', interpretable: 85, blackbox: 55 },
  ];

  // Marketing outcome data based on user inputs
  const getMarketingOutcome = () => {
    let rule = "";
    let probability = 0;
    let discount = "";
    let explanation = "";

    // Simple rule set based on customer parameters
    if (age < 25 && timeOfDay === "Evening" && income > 50) {
      rule = "Young evening shoppers with high income";
      probability = 0.85;
      discount = "20% off electronics";
      explanation = "Young professionals who shop in the evening with disposable income are highly responsive to technology discounts.";
    } else if (distance < 5 && hasChildren) {
      rule = "Nearby shoppers with children";
      probability = 0.72;
      discount = "Buy-one-get-one kids items";
      explanation = "Families located close to stores respond well to promotions that provide value for children's products.";
    } else if (previousVisits > 3 && weekend) {
      rule = "Weekend regulars";
      probability = 0.65;
      discount = "15% off favorite categories";
      explanation = "Loyal customers who visit on weekends show strong affinity for personalized category discounts.";
    } else if (income > 100) {
      rule = "High-income customers";
      probability = 0.45;
      discount = "Premium product promotions";
      explanation = "Affluent customers are moderately responsive to exclusive or premium offering promotions.";
    } else {
      rule = "General customers";
      probability = 0.25;
      discount = "10% off next purchase";
      explanation = "Basic promotional offer for customer segments with lower predicted response rates.";
    }

    return { rule, probability, discount, explanation };
  };

  const handleGenerateStrategy = () => {
    setShowResults(true);
  };

  const { rule, probability, discount, explanation } = getMarketingOutcome();

  // UI Helper for slider inputs
  const Slider = ({ label, value, onChange, min, max, step = 1 }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Seeing Through the Black Box: Why Interpretable Models Matter in Marketing
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Balancing accuracy with understanding for effective decision-making
      </p>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="flex w-full mb-6 border-b">
          <TabsTrigger 
            value="comparison" 
            className="flex-1 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Model Comparison
          </TabsTrigger>
          <TabsTrigger 
            value="rules" 
            className="flex-1 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Interactive Rules
          </TabsTrigger>
          <TabsTrigger 
            value="simulator" 
            className="flex-1 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Decision Simulator
          </TabsTrigger>
          <TabsTrigger 
            value="impact" 
            className="flex-1 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Marketing Impact
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Model Comparison */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-xl font-semibold">The Interpretability Advantage</h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="py-1">✓ Transparency reveals the 'why' behind predictions</p>
                <p className="py-1">✓ Builds trust with marketing decision-makers</p>
                <p className="py-1">✓ Enables strategy refinement based on clear rules</p>
                <p className="py-1">✓ Fosters better customer engagement</p>
                <p className="py-1">✓ Allows validation of business logic</p>
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="text-center px-4">
                  <img src="https://img.icons8.com/color/96/000000/happy-cloud.png" alt="Confident marketer" className="mx-auto" />
                  <p className="mt-2">Clear controls and understanding</p>
                </div>
                <div className="text-center px-4">
                  <img src="https://img.icons8.com/color/96/000000/confused-cloud.png" alt="Confused marketer" className="mx-auto" />
                  <p className="mt-2">No visibility into decision process</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7">
              <h2 className="text-xl font-semibold mb-4">Model Comparison Across Key Dimensions</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={modelComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="interpretable" name="Interpretable Models" fill="#10b981" />
                    <Bar dataKey="blackbox" name="#ef4444" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Interactive Rules */}
        <TabsContent value="rules" className="space-y-6">
          <h2 className="text-xl font-semibold text-center mb-4">Interpretable Model vs. Black Box Model</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-center mb-4">Interpretable Model</h3>
              
              <div className="flex justify-around mb-4">
                {nodes.map(node => (
                  <button 
                    key={node.id}
                    className={cn(
                      "py-2 px-4 rounded-md text-white transition-all",
                      activeNode === node.id ? "bg-green-600" : "bg-green-400 hover:bg-green-500"
                    )}
                    onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  >
                    Node {node.id}
                  </button>
                ))}
              </div>
              
              {activeNode && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-md mb-4">
                  <p>{nodes.find(n => n.id === activeNode).rule}</p>
                </div>
              )}
              
              <div className="mt-4 space-y-2">
                <p>Click on a node above to see the exact decision rule. These clear rules:</p>
                <p className="text-green-700">✓ Show exactly how decisions are made</p>
                <p className="text-green-700">✓ Provide actionable marketing insights</p>
                <p className="text-green-700">✓ Allow easy validation by business experts</p>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-center mb-4">Black Box Model</h3>
              
              <div className="flex justify-center items-center h-48 bg-gray-100 rounded-md mb-4">
                <div className="text-center">
                  <p className="text-4xl text-gray-400 mb-2">???</p>
                  <img 
                    src="https://miro.medium.com/max/1400/1*iWS1HIm9z0MYyUbbpYBjwg.png" 
                    alt="Complex Neural Network" 
                    className="max-w-[80%] h-auto mx-auto opacity-70" 
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <p>Black box models hide their decision-making process:</p>
                <p className="text-red-700">✗ Impossible to understand why predictions are made</p>
                <p className="text-red-700">✗ Difficult to trust or validate with domain knowledge</p>
                <p className="text-red-700">✗ Cannot easily extract actionable insights</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Decision Simulator */}
        <TabsContent value="simulator" className="space-y-6">
          <h2 className="text-xl font-semibold mb-2">Interactive Marketing Decision Simulator</h2>
          <p className="mb-6">Adjust customer parameters to see how an interpretable model guides decision-making:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <Slider 
                  label="Customer Age" 
                  value={age} 
                  onChange={(newValue) => {setAge(newValue); setShowResults(false);}} 
                  min={18} 
                  max={65} 
                />
                
                <Slider 
                  label="Income (thousands $)" 
                  value={income} 
                  onChange={(newValue) => {setIncome(newValue); setShowResults(false);}} 
                  min={20} 
                  max={150} 
                />
                
                <Slider 
                  label="Distance to Store (miles)" 
                  value={distance} 
                  onChange={(newValue) => {setDistance(newValue); setShowResults(false);}} 
                  min={0.1} 
                  max={15} 
                  step={0.1} 
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time of Day</label>
                  <select 
                    value={timeOfDay} 
                    onChange={(e) => {setTimeOfDay(e.target.value); setShowResults(false);}}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
                
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="weekend" 
                    checked={weekend} 
                    onChange={(e) => {setWeekend(e.target.checked); setShowResults(false);}}
                    className="h-4 w-4 text-blue-600 rounded" 
                  />
                  <label htmlFor="weekend" className="ml-2 text-sm text-gray-700">Weekend?</label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="hasChildren" 
                    checked={hasChildren} 
                    onChange={(e) => {setHasChildren(e.target.checked); setShowResults(false);}}
                    className="h-4 w-4 text-blue-600 rounded" 
                  />
                  <label htmlFor="hasChildren" className="ml-2 text-sm text-gray-700">Has Children?</label>
                </div>
                
                <Slider 
                  label="Previous Store Visits" 
                  value={previousVisits} 
                  onChange={(newValue) => {setPreviousVisits(newValue); setShowResults(false);}} 
                  min={0} 
                  max={10} 
                />
                
                <button 
                  onClick={handleGenerateStrategy}
                  className="w-full py-2 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow"
                >
                  Generate Coupon Strategy
                </button>
              </div>
            </div>
            
            <div className="md:col-span-8">
              {showResults ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-center mb-4">Marketing Decision Results</h3>
                  
                  <div className="flex justify-center mb-6">
                    <div className="w-48 h-48 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                        {Math.round(probability * 100)}%
                      </div>
                      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" stroke="#f3f4f6" strokeWidth="10" 
                        />
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" stroke={probability > 0.7 ? "#10b981" : probability > 0.4 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="10" 
                          strokeDasharray={`${probability * 283} 283`} 
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <h4 className="font-semibold">Applied Rule: {rule}</h4>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-md mb-4">
                    <h4 className="font-semibold">Recommended Strategy: {discount}</h4>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Rule Explanation:</h4>
                    <p className="mb-2">This recommendation is based on clear, interpretable rules from our model:</p>
                    <p className="mb-2">• Customer segment identified: <span className="font-semibold">{rule}</span></p>
                    <p className="mb-2">• Probability of accepting coupon: <span className="font-semibold">{(probability * 100).toFixed(2)}%</span></p>
                    <p className="mb-2">• <span className="font-semibold">Why this works:</span> {explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow flex justify-center items-center h-full">
                  <p className="text-lg text-gray-500">
                    Adjust parameters and click "Generate Coupon Strategy" to see results
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Marketing Impact */}
        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Interactive Poll</h3>
              <p className="mb-4">Which would you trust more for allocating your $1M marketing budget?</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setPollAnswer('blackbox')}
                  className={cn(
                    "w-full p-4 text-left rounded-md border transition-colors",
                    pollAnswer === 'blackbox' 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  )}
                >
                  A highly accurate model you can't explain
                </button>
                
                <button 
                  onClick={() => setPollAnswer('interpretable')}
                  className={cn(
                    "w-full p-4 text-left rounded-md border transition-colors",
                    pollAnswer === 'interpretable' 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  )}
                >
                  A slightly less accurate model with clear reasoning you can verify
                </button>
              </div>
              
              {pollAnswer && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                  <p>
                    {pollAnswer === 'blackbox' 
                      ? "While accuracy is important, black box models may hide biases or errors that could lead to costly mistakes in your marketing campaigns." 
                      : "Great choice! The small accuracy trade-off is usually worth the added transparency, trust, and ability to validate decisions with domain expertise."}
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Real-World Impact</h3>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold mr-4">
                  RG
                </div>
                <div>
                  <h4 className="font-semibold mb-1">RetailGiant Success Story</h4>
                  <p>
                    <span className="font-semibold">Increased conversion rates by 28%</span> after switching to interpretable models for their coupon targeting system. Marketing managers could directly align business goals with model rules.
                  </p>
                </div>
              </div>
              
              <h4 className="font-semibold mb-4">Key Benefits Realized</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-md">
                  <h5 className="font-medium mb-1">Trust & Transparency</h5>
                  <p className="text-sm">See the 'why' behind every marketing prediction</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <h5 className="font-medium mb-1">Actionable Insights</h5>
                  <p className="text-sm">Convert rules directly into targeted campaign strategies</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <h5 className="font-medium mb-1">Strategic Refinement</h5>
                  <p className="text-sm">Easily validate and improve your approach using clear IF-THEN logic</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <h5 className="font-medium mb-1">Business Value</h5>
                  <p className="text-sm">Balance accuracy with understanding for sustainable marketing success</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Final Call to Action */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center mb-4">Balancing Accuracy and Interpretability</h2>
        <p className="text-center">
          Our research framework combines reliable predictions with simple, clear decision rules. This dual benefit means businesses get accurate forecasts alongside insights that are easy to understand and act on, leading to more effective and data-driven marketing strategies.
        </p>
      </div>
    </div>
  );
}

export default InterpretableModelsSlide;
