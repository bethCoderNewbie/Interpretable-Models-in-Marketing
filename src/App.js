import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Slider, Select, MenuItem, FormControlLabel, Checkbox, Button, Paper, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GaugeChart from 'react-gauge-chart';
import './App.css';

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(60);
  const [distance, setDistance] = useState(5.0);
  const [timeOfDay, setTimeOfDay] = useState('Afternoon');
  const [weekend, setWeekend] = useState(true);
  const [children, setChildren] = useState(false);
  const [previousVisits, setPreviousVisits] = useState(2);
  const [showResults, setShowResults] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [pollAnswer, setPollAnswer] = useState(null);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleGenerateStrategy = () => {
    setShowResults(true);
  };

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
    } else if (distance < 5 && children) {
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

  const { rule, probability, discount, explanation } = getMarketingOutcome();

  // Sample interpretable model code snippet
  const interpretableCode = `
  # Interpretable Rule-Based Model (Bayesian Rule List)
  
  IF age < 25 AND time = evening AND income > 50k THEN
      coupon_acceptance = 85%
  ELSE IF distance < 5 miles AND has_children = yes THEN
      coupon_acceptance = 72% 
  ELSE IF previous_visits > 3 AND weekend = yes THEN
      coupon_acceptance = 65%
  ELSE IF income > 100k THEN
      coupon_acceptance = 45%
  ELSE
      coupon_acceptance = 25%
  
  # Clear decision logic that marketers can understand!
  `;

  return (
    <div className="App">
      <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Seeing Through the Black Box: Why Interpretable Models Matter in Marketing
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#34495e', mb: 4 }}>
          Balancing accuracy with understanding for effective decision-making
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered variant="fullWidth">
            <Tab label="Model Comparison" />
            <Tab label="Interactive Rules" />
            <Tab label="Decision Simulator" />
            <Tab label="Marketing Impact" />
          </Tabs>
          
          {/* Tab 1: Model Comparison */}
          {tabIndex === 0 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                  <Typography variant="h6" gutterBottom>The Interpretability Advantage</Typography>
                  <Paper elevation={2} sx={{ p: 3, bgcolor: '#f8f9fa' }}>
                    <Typography variant="body1" paragraph>✓ Transparency reveals the 'why' behind predictions</Typography>
                    <Typography variant="body1" paragraph>✓ Builds trust with marketing decision-makers</Typography>
                    <Typography variant="body1" paragraph>✓ Enables strategy refinement based on clear rules</Typography>
                    <Typography variant="body1" paragraph>✓ Fosters better customer engagement</Typography>
                    <Typography variant="body1" paragraph>✓ Allows validation of business logic</Typography>
                  </Paper>
                  
                  <Box sx={{ mt: 4 }}>
                    <div className="visual-metaphor" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="marketer interpretable" style={{ textAlign: 'center', padding: '10px' }}>
                        <img src="https://img.icons8.com/color/96/000000/happy-cloud.png" alt="Confident marketer" />
                        <Typography>Clear controls and understanding</Typography>
                      </div>
                      <div className="marketer blackbox" style={{ textAlign: 'center', padding: '10px' }}>
                        <img src="https://img.icons8.com/color/96/000000/confused-cloud.png" alt="Confused marketer" />
                        <Typography>No visibility into decision process</Typography>
                      </div>
                    </div>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <Typography variant="h6" gutterBottom>Model Comparison Across Key Dimensions</Typography>
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={modelComparisonData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="interpretable" name="Interpretable Models" fill="#5cb85c" />
                        <Bar dataKey="blackbox" name="Black Box Models" fill="#d9534f" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Tab 2: Interactive Rules */}
          {tabIndex === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom align="center">Interpretable Model vs. Black Box Model</Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: '#f3fff3' }}>
                    <Typography variant="h6" gutterBottom align="center">Interpretable Model</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                      <div className="tree-visualization" style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '20px' }}>
                        {nodes.map(node => (
                          <div 
                            key={node.id}
                            style={{ 
                              padding: '10px', 
                              margin: '10px', 
                              borderRadius: '5px',
                              backgroundColor: activeNode === node.id ? '#4CAF50' : '#8bc34a',
                              color: 'white',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                          >
                            Node {node.id}
                          </div>
                        ))}
                      </div>
                      {activeNode && (
                        <Paper elevation={3} sx={{ p: 2, bgcolor: '#e8f5e9', width: '100%' }}>
                          <Typography>{nodes.find(n => n.id === activeNode).rule}</Typography>
                        </Paper>
                      )}
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body1" paragraph>
                        Click on a node above to see the exact decision rule. These clear rules:
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'green', mb: 1 }}>✓ Show exactly how decisions are made</Typography>
                      <Typography variant="body1" sx={{ color: 'green', mb: 1 }}>✓ Provide actionable marketing insights</Typography>
                      <Typography variant="body1" sx={{ color: 'green', mb: 1 }}>✓ Allow easy validation by business experts</Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: '#fff3f3' }}>
                    <Typography variant="h6" gutterBottom align="center">Black Box Model</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', bgcolor: '#f5f5f5', borderRadius: '5px', mb: 3 }}>
                      <div className="neural-network" style={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#888' }}>???</Typography>
                        <img 
                          src="https://miro.medium.com/max/1400/1*iWS1HIm9z0MYyUbbpYBjwg.png" 
                          alt="Complex Neural Network Structure" 
                          style={{ maxWidth: '80%', height: 'auto', marginTop: '20px', opacity: '0.7' }} 
                        />
                      </div>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body1" paragraph>
                        Black box models hide their decision-making process:
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'red', mb: 1 }}>✗ Impossible to understand why predictions are made</Typography>
                      <Typography variant="body1" sx={{ color: 'red', mb: 1 }}>✗ Difficult to trust or validate with domain knowledge</Typography>
                      <Typography variant="body1" sx={{ color: 'red', mb: 1 }}>✗ Cannot easily extract actionable insights</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Tab 3: Decision Simulator */}
          {tabIndex === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Interactive Marketing Decision Simulator</Typography>
              <Typography variant="body1" paragraph>
                Adjust customer parameters to see how an interpretable model guides decision-making:
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography gutterBottom>Customer Age</Typography>
                    <Slider
                      value={age}
                      onChange={(e, newValue) => {setAge(newValue); setShowResults(false);}}
                      min={18}
                      max={65}
                      valueLabelDisplay="auto"
                    />
                    
                    <Typography gutterBottom sx={{ mt: 2 }}>Income (thousands $)</Typography>
                    <Slider
                      value={income}
                      onChange={(e, newValue) => {setIncome(newValue); setShowResults(false);}}
                      min={20}
                      max={150}
                      valueLabelDisplay="auto"
                    />
                    
                    <Typography gutterBottom sx={{ mt: 2 }}>Distance to Store (miles)</Typography>
                    <Slider
                      value={distance}
                      onChange={(e, newValue) => {setDistance(newValue); setShowResults(false);}}
                      min={0.1}
                      max={15}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                    
                    <Typography gutterBottom sx={{ mt: 2 }}>Time of Day</Typography>
                    <Select
                      fullWidth
                      value={timeOfDay}
                      onChange={(e) => {setTimeOfDay(e.target.value); setShowResults(false);}}
                    >
                      <MenuItem value="Morning">Morning</MenuItem>
                      <MenuItem value="Afternoon">Afternoon</MenuItem>
                      <MenuItem value="Evening">Evening</MenuItem>
                    </Select>
                    
                    <Box sx={{ mt: 2 }}>
                      <FormControlLabel
                        control={<Checkbox checked={weekend} onChange={(e) => {setWeekend(e.target.checked); setShowResults(false);}} />}
                        label="Weekend?"
                      />
                    </Box>
                    
                    <Box>
                      <FormControlLabel
                        control={<Checkbox checked={children} onChange={(e) => {setChildren(e.target.checked); setShowResults(false);}} />}
                        label="Has Children?"
                      />
                    </Box>
                    
                    <Typography gutterBottom sx={{ mt: 2 }}>Previous Store Visits</Typography>
                    <Slider
                      value={previousVisits}
                      onChange={(e, newValue) => {setPreviousVisits(newValue); setShowResults(false);}}
                      min={0}
                      max={10}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ mt: 3 }}
                      onClick={handleGenerateStrategy}
                    >
                      Generate Coupon Strategy
                    </Button>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  {showResults ? (
                    <Paper elevation={2} sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom align="center">Marketing Decision Results</Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <GaugeChart 
                          id="gauge-chart"
                          nrOfLevels={3}
                          colors={["#FF5F6D", "#FFC371", "#5cb85c"]}
                          percent={probability}
                          textColor="#000000"
                          formatTextValue={value => value + '%'}
                        />
                      </Box>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Paper elevation={1} sx={{ p: 2, bgcolor: '#e8f4fd' }}>
                            <Typography variant="h6">Applied Rule: {rule}</Typography>
                          </Paper>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Paper elevation={1} sx={{ p: 2, bgcolor: '#e8fde8' }}>
                            <Typography variant="h6">Recommended Strategy: {discount}</Typography>
                          </Paper>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>Rule Explanation:</Typography>
                          <Typography variant="body1" paragraph>
                            This recommendation is based on clear, interpretable rules from our model:
                          </Typography>
                          <Typography variant="body1" paragraph>
                            • Customer segment identified: <strong>{rule}</strong>
                          </Typography>
                          <Typography variant="body1" paragraph>
                            • Probability of accepting coupon: <strong>{(probability * 100).toFixed(2)}%</strong>
                          </Typography>
                          <Typography variant="body1" paragraph>
                            • <strong>Why this works:</strong> {explanation}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ) : (
                    <Paper elevation={2} sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography variant="h6" sx={{ color: '#888' }}>
                        Adjust parameters and click "Generate Coupon Strategy" to see results
                      </Typography>
                    </Paper>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Tab 4: Marketing Impact */}
          {tabIndex === 3 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Interactive Poll</Typography>
                    <Typography variant="body1" paragraph>
                      Which would you trust more for allocating your $1M marketing budget?
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button 
                        variant={pollAnswer === 'blackbox' ? 'contained' : 'outlined'} 
                        color="primary"
                        onClick={() => setPollAnswer('blackbox')}
                        sx={{ p: 2, textAlign: 'left', justifyContent: 'flex-start' }}
                      >
                        A highly accurate model you can't explain
                      </Button>
                      
                      <Button 
                        variant={pollAnswer === 'interpretable' ? 'contained' : 'outlined'} 
                        color="primary"
                        onClick={() => setPollAnswer('interpretable')}
                        sx={{ p: 2, textAlign: 'left', justifyContent: 'flex-start' }}
                      >
                        A slightly less accurate model with clear reasoning you can verify
                      </Button>
                    </Box>
                    
                    {pollAnswer && (
                      <Box sx={{ mt: 3, p: 2, bgcolor: '#f3f3f3', borderRadius: 2 }}>
                        <Typography variant="body1">
                          {pollAnswer === 'blackbox' ? 
                            "While accuracy is important, black box models may hide biases or errors that could lead to costly mistakes in your marketing campaigns." : 
                            "Great choice! The small accuracy trade-off is usually worth the added transparency, trust, and ability to validate decisions with domain expertise."}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Real-World Impact</Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ width: 100, height: 100, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', mr: 3 }}>
                        <Typography variant="h4">RG</Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="h6" gutterBottom>RetailGiant Success Story</Typography>
                        <Typography variant="body1">
                          <strong>Increased conversion rates by 28%</strong> after switching to interpretable models for their coupon targeting system. Marketing managers could directly align business goals with model rules, leading to more effective campaigns and higher ROI.
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" gutterBottom>Key Benefits Realized</Typography>
                      <div className="key-points" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>Trust & Transparency</Typography>
                          <Typography variant="body2">See the 'why' behind every marketing prediction</Typography>
                        </Paper>
                        
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>Actionable Insights</Typography>
                          <Typography variant="body2">Convert rules directly into targeted campaign strategies</Typography>
                        </Paper>
                        
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>Strategic Refinement</Typography>
                          <Typography variant="body2">Easily validate and improve your approach using clear IF-THEN logic</Typography>
                        </Paper>
                        
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>Business Value</Typography>
                          <Typography variant="body2">Balance accuracy with understanding for sustainable marketing success</Typography>
                        </Paper>
                      </div>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
        
        {/* Final Call to Action */}
        <Paper elevation={3} sx={{ p: 3, bgcolor: '#e8f4fd' }}>
          <Typography variant="h5" gutterBottom align="center">Balancing Accuracy and Interpretability</Typography>
          <Typography variant="body1" paragraph align="center">
            Our research framework combines reliable predictions with simple, clear decision rules. This dual benefit means businesses get accurate forecasts alongside insights that are easy to understand and act on, leading to more effective and data-driven marketing strategies.
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}

export default App;
