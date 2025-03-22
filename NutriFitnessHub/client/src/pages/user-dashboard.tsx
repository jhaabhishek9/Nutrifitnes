import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import BMICalculator from "@/components/bmi-calculator";
import { Loader2, User, CalendarDays, Calculator, Utensils, Settings } from "lucide-react";

interface DietPlan {
  name: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  features: string[];
  popular: boolean;
}

export default function UserDashboard() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: dietPlans, isLoading } = useQuery<DietPlan[]>({
    queryKey: ["/api/diet-plans"],
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 md:shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Dashboard</CardTitle>
                <CardDescription>Manage your nutrition plans</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  orientation="vertical"
                  className="w-full"
                >
                  <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="overview"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <User className="h-4 w-4 mr-2" /> Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="plans"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <Utensils className="h-4 w-4 mr-2" /> My Diet Plans
                    </TabsTrigger>
                    <TabsTrigger
                      value="bmi"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <Calculator className="h-4 w-4 mr-2" /> BMI Calculator
                    </TabsTrigger>
                    <TabsTrigger
                      value="appointments"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <CalendarDays className="h-4 w-4 mr-2" /> Appointments
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                    >
                      <Settings className="h-4 w-4 mr-2" /> Settings
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="p-4 pt-0 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging out...
                      </>
                    ) : (
                      "Log out"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <TabsContent value="overview" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome, {user.firstName || user.username}!</CardTitle>
                  <CardDescription>
                    Here's an overview of your nutrition journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Active Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">
                            {dietPlans && dietPlans.length > 0 ? dietPlans[1].name : "No active plan"}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {dietPlans && dietPlans.length > 0 ? "Valid until Jun 30, 2023" : "Purchase a plan to get started"}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">BMI Status</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">22.5</div>
                          <p className="text-xs text-muted-foreground">Normal</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">Upcoming Consultation</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">May 15</div>
                          <p className="text-xs text-muted-foreground">10:00 AM with Eshita Pareek</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mr-4 rounded-full bg-primary/10 p-2">
                              <Calculator className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">BMI Calculated</p>
                              <p className="text-sm text-muted-foreground">Your BMI is 22.5 (Normal)</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-4 rounded-full bg-primary/10 p-2">
                              <Utensils className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Diet Plan Purchased</p>
                              <p className="text-sm text-muted-foreground">Premium Plan - ₹12,000</p>
                              <p className="text-xs text-muted-foreground">1 week ago</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plans" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>My Diet Plans</CardTitle>
                  <CardDescription>
                    Manage your active and past diet plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : dietPlans && dietPlans.length > 0 ? (
                    <div className="space-y-4">
                      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{dietPlans[1].name}</h3>
                            <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1 mb-2">Active</div>
                            <p className="text-sm text-muted-foreground">{dietPlans[1].description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{dietPlans[1].priceINR.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Purchased on May 1, 2023</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-medium text-sm mb-2">Included Features:</h4>
                          <ul className="space-y-1">
                            {dietPlans[1].features.map((feature, index) => (
                              <li key={index} className="text-sm flex items-center">
                                <svg className="h-4 w-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Download Plan</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You don't have any active diet plans yet.</p>
                      <Button>Browse Available Plans</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bmi" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>BMI Calculator</CardTitle>
                  <CardDescription>
                    Track your Body Mass Index over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BMICalculator inDashboard={true} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>My Appointments</CardTitle>
                  <CardDescription>
                    Manage your consultation appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground mt-2">No upcoming appointments</p>
                    </div>
                    <Button>Book a Consultation</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your profile and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Username</label>
                        <p className="mt-1">{user.username}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="mt-1">{user.email || "Not set"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <p className="mt-1">{user.firstName || "Not set"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <p className="mt-1">{user.lastName || "Not set"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="mt-1">{user.phone || "Not set"}</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
