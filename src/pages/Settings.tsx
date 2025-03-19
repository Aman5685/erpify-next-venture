
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import PageTransition from '@/components/ui/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from '@/contexts/ThemeContext';
import { CompanyInfo, SystemPreferences, saveCompanyInfo, getCompanyInfo, saveSystemPreferences, getSystemPreferences } from '@/services/settingsService';

const Settings = () => {
  const { toast } = useToast();
  const { bgTheme, changeBgTheme } = useTheme();
  
  // Company Info state
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(getCompanyInfo());
  
  // System Preferences state
  const [systemPreferences, setSystemPreferences] = useState<SystemPreferences>(getSystemPreferences());
  
  // Handle input changes for company info
  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle system preferences changes
  const handleSystemPreferenceChange = (key: keyof SystemPreferences, value: string) => {
    setSystemPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSaveGeneral = () => {
    // Save company info
    saveCompanyInfo(companyInfo);
    
    toast({
      title: "General settings saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  const handleSavePreferences = () => {
    // Save system preferences
    saveSystemPreferences(systemPreferences);
    
    toast({
      title: "System preferences saved",
      description: "Your system preferences have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    });
  };

  return (
    <Layout>
      <PageTransition className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your application preferences</p>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company details and business information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={companyInfo.name} 
                    onChange={handleCompanyInfoChange} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={companyInfo.email}
                      onChange={handleCompanyInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={companyInfo.phone}
                      onChange={handleCompanyInfoChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={companyInfo.address}
                    onChange={handleCompanyInfoChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                  <Input 
                    id="taxId" 
                    name="taxId" 
                    value={companyInfo.taxId}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>
                  Configure system-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select 
                    value={systemPreferences.dateFormat}
                    onValueChange={(value) => handleSystemPreferenceChange('dateFormat', value)}
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select 
                    value={systemPreferences.currency}
                    onValueChange={(value) => handleSystemPreferenceChange('currency', value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">System Language</Label>
                  <Select 
                    value={systemPreferences.language}
                    onValueChange={(value) => handleSystemPreferenceChange('language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSavePreferences}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure which emails you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order notifications</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive emails when new orders are placed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Inventory alerts</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when products are low in stock
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer activity</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Notifications about new customers and account activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System updates</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get emails about system updates and maintenance
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Notifications</CardTitle>
                <CardDescription>
                  Configure in-app notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dashboard alerts</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Show important alerts on the dashboard
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Browser notifications</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enable desktop notifications in your browser
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className={`border-2 rounded-md p-1 cursor-pointer transition-all ${bgTheme === 'bg-light-blue' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => changeBgTheme('bg-light-blue')}
                      >
                        <div className="h-20 w-32 bg-light-blue rounded"></div>
                      </div>
                      <span className="text-sm">Light Blue</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className={`border-2 rounded-md p-1 cursor-pointer transition-all ${bgTheme === 'bg-gradient-main' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => changeBgTheme('bg-gradient-main')}
                      >
                        <div className="h-20 w-32 bg-gradient-main rounded"></div>
                      </div>
                      <span className="text-sm">Default (Dark Purple)</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className={`border-2 rounded-md p-1 cursor-pointer transition-all ${bgTheme === 'bg-gradient-purple' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => changeBgTheme('bg-gradient-purple')}
                      >
                        <div className="h-20 w-32 bg-gradient-purple rounded"></div>
                      </div>
                      <span className="text-sm">Vibrant Purple</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className={`border-2 rounded-md p-1 cursor-pointer transition-all ${bgTheme === 'bg-gradient-blue' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => changeBgTheme('bg-gradient-blue')}
                      >
                        <div className="h-20 w-32 bg-gradient-blue rounded"></div>
                      </div>
                      <span className="text-sm">Deep Blue</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className={`border-2 rounded-md p-1 cursor-pointer transition-all ${bgTheme === 'bg-gradient-green' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => changeBgTheme('bg-gradient-green')}
                      >
                        <div className="h-20 w-32 bg-gradient-green rounded"></div>
                      </div>
                      <span className="text-sm">Forest Green</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className={`border-2 rounded-md p-1 cursor-pointer transition-all ${bgTheme === 'bg-gradient-orange' ? 'border-primary' : 'border-muted'}`}
                        onClick={() => changeBgTheme('bg-gradient-orange')}
                      >
                        <div className="h-20 w-32 bg-gradient-orange rounded"></div>
                      </div>
                      <span className="text-sm">Sunset Orange</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="density">Interface Density</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="density">
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Text Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="fontSize">
                      <SelectValue placeholder="Select text size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSaveAppearance}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </PageTransition>
    </Layout>
  );
};

export default Settings;
