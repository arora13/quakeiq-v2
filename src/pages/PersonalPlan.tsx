
import React, { useState, useEffect } from 'react';
import { FileText, Brain, Download, Save, ArrowLeft, Star, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AIFormData {
  zipCode: string;
  householdSize: number;
  hasPets: boolean;
  medicalNeeds: string;
  language: string;
}

export const PersonalPlan: React.FC = () => {
  const navigate = useNavigate();
  const [personalPlan, setPersonalPlan] = useState('');
  const [aiFormData, setAiFormData] = useState<AIFormData>({
    zipCode: '',
    householdSize: 1,
    hasPets: false,
    medicalNeeds: '',
    language: 'English'
  });
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState('');
  const [safetyScore, setSafetyScore] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Load saved personal plan from localStorage
    const savedPlan = localStorage.getItem('personalEarthquakePlan');
    if (savedPlan) {
      setPersonalPlan(savedPlan);
    }
  }, []);

  const savePlan = () => {
    localStorage.setItem('personalEarthquakePlan', personalPlan);
    alert('Plan saved successfully!');
  };

  const generateAIPlan = async () => {
    setIsGenerating(true);
    
    // Mock AI plan generation (in real app, would call Gemini API)
    setTimeout(() => {
      const mockPlan = `# Emergency Earthquake Plan for ${aiFormData.zipCode}

## Household Information
- **Location**: ZIP ${aiFormData.zipCode}
- **Household Size**: ${aiFormData.householdSize} people
- **Pets**: ${aiFormData.hasPets ? 'Yes' : 'No'}
- **Medical Needs**: ${aiFormData.medicalNeeds || 'None specified'}
- **Language**: ${aiFormData.language}

## BEFORE AN EARTHQUAKE

### Emergency Kit Checklist
- Water: 1 gallon per person per day (3-day supply minimum)
- Non-perishable food (3-day supply for ${aiFormData.householdSize} people)
- Battery-powered or hand crank radio
- Flashlight and extra batteries
- First aid kit
- Whistle for signaling help
- Dust masks and plastic sheeting
- Moist towelettes and garbage bags
- Wrench or pliers to turn off utilities
- Local maps
${aiFormData.hasPets ? '- Pet food, water, and supplies\n- Pet carriers or leashes' : ''}
${aiFormData.medicalNeeds ? `- Extra ${aiFormData.medicalNeeds.toLowerCase()} medications and supplies` : ''}

### Home Preparation
- Secure heavy furniture and appliances to walls
- Install safety latches on cabinets
- Locate safe spots in each room (under sturdy tables, against interior walls)
- Know how to turn off gas, water, and electricity
- Create a family communication plan

## DURING AN EARTHQUAKE

### If Indoors:
1. **DROP** to hands and knees
2. **TAKE COVER** under a sturdy desk or table
3. **HOLD ON** to your shelter and protect your head/neck

### If Outdoors:
- Move away from buildings, trees, and power lines
- Get into the open and stay there

### If in a Vehicle:
- Pull over safely and set parking brake
- Avoid overpasses, bridges, and power lines
- Stay inside until shaking stops

## AFTER AN EARTHQUAKE

### Immediate Actions:
1. Check for injuries and provide first aid
2. Check for hazards (gas leaks, electrical damage, structural damage)
3. Turn off utilities if damaged
4. Use text messages or social media to communicate (phone lines may be jammed)
5. Listen to emergency broadcasts
6. Be prepared for aftershocks

### Communication Plan:
- Primary meeting place: [Specify local location]
- Out-of-area contact: [Specify contact information]
- Local emergency contacts: 911
- Poison Control: 1-800-222-1222

## SPECIAL CONSIDERATIONS FOR YOUR AREA
Based on your ZIP code ${aiFormData.zipCode}, be aware of:
- Proximity to major fault lines
- Local evacuation routes
- Community emergency shelters
- Tsunami risk (if coastal)

---
*This plan was generated using AI based on your specific household needs. Review and customize as needed.*`;

      setAiGeneratedPlan(mockPlan);
      
      // Generate a safety score based on form data
      let score = 7; // Base score
      if (aiFormData.medicalNeeds) score += 1;
      if (aiFormData.hasPets) score += 0.5;
      if (aiFormData.householdSize > 4) score += 0.5;
      
      setSafetyScore(Math.min(score, 10));
      setIsGenerating(false);
    }, 2000);
  };

  const downloadPlan = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSafetyScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent Preparedness';
    if (score >= 6) return 'Good Preparedness';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="group mb-6 flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:translate-x-1"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-lg animate-pulse-slow">
                <FileText className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-800 dark:from-green-400 dark:via-blue-500 dark:to-green-600 bg-clip-text text-transparent mb-4">
              Emergency Safety Plans
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Create your personalized earthquake emergency plan or let AI generate one based on your specific needs.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="personal" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>My Personal Plan</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>AI Safety Plan</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Plan Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card className="animate-fade-in hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <span>Write Your Emergency Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Create a customized emergency plan that fits your family's specific needs and situation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={personalPlan}
                    onChange={(e) => setPersonalPlan(e.target.value)}
                    placeholder="Write your emergency plan here... Include details about your family, emergency contacts, meeting places, supplies, and procedures."
                    className="min-h-[400px] text-base leading-relaxed"
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={savePlan} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4" />
                      <span>Save Plan</span>
                    </Button>
                    <Button 
                      onClick={() => downloadPlan(personalPlan, 'my-earthquake-plan.txt')}
                      variant="outline"
                      className="flex items-center space-x-2"
                      disabled={!personalPlan.trim()}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Plan</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Plan Tab */}
            <TabsContent value="ai" className="space-y-6">
              <Card className="animate-fade-in hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span>AI-Generated Safety Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Get a personalized emergency plan generated by AI based on your household information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">California ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={aiFormData.zipCode}
                        onChange={(e) => setAiFormData({...aiFormData, zipCode: e.target.value})}
                        placeholder="e.g., 90210"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="householdSize">Household Size</Label>
                      <Input
                        id="householdSize"
                        type="number"
                        min="1"
                        value={aiFormData.householdSize}
                        onChange={(e) => setAiFormData({...aiFormData, householdSize: parseInt(e.target.value) || 1})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="language">Primary Language</Label>
                      <select
                        id="language"
                        value={aiFormData.language}
                        onChange={(e) => setAiFormData({...aiFormData, language: e.target.value})}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Korean">Korean</option>
                        <option value="Vietnamese">Vietnamese</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="hasPets"
                        checked={aiFormData.hasPets}
                        onChange={(e) => setAiFormData({...aiFormData, hasPets: e.target.checked})}
                        className="rounded border-input"
                      />
                      <Label htmlFor="hasPets">Have pets</Label>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="medicalNeeds">Special Medical Needs (optional)</Label>
                    <Textarea
                      id="medicalNeeds"
                      value={aiFormData.medicalNeeds}
                      onChange={(e) => setAiFormData({...aiFormData, medicalNeeds: e.target.value})}
                      placeholder="List any medications, medical equipment, or special health considerations..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button 
                    onClick={generateAIPlan}
                    disabled={isGenerating || !aiFormData.zipCode}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating AI Plan...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate AI Safety Plan
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Score */}
              {safetyScore !== null && (
                <Card className="animate-fade-in border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <span>Safety Preparedness Score</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-4xl font-bold ${getSafetyScoreColor(safetyScore)}`}>
                          {safetyScore.toFixed(1)}/10
                        </div>
                        <div className={`text-sm font-medium ${getSafetyScoreColor(safetyScore)}`}>
                          {getSafetyScoreLabel(safetyScore)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                        <Lightbulb className="h-5 w-5" />
                        <span className="text-sm">AI-assessed readiness level</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Generated Plan */}
              {aiGeneratedPlan && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Your AI-Generated Emergency Plan</CardTitle>
                    <CardDescription>
                      Review, customize, and download your personalized plan below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">{aiGeneratedPlan}</pre>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        onClick={() => downloadPlan(aiGeneratedPlan, 'ai-earthquake-plan.txt')}
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download AI Plan</span>
                      </Button>
                      <Button 
                        onClick={() => {
                          setPersonalPlan(aiGeneratedPlan);
                          setActiveTab('personal');
                        }}
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Edit in Personal Plan</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
