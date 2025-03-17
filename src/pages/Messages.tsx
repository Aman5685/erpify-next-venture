
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import PageTransition from '@/components/ui/PageTransition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, User } from 'lucide-react';

const Messages = () => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!recipient || !message) {
      toast({
        title: "Missing information",
        description: "Please provide a recipient email and message content.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Message sent",
        description: `Your message has been sent to ${recipient}.`,
      });
      
      // Reset form
      setRecipient('');
      setSubject('');
      setMessage('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <PageTransition className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground mt-1">Send messages to team members and contacts</p>
            </div>
          </div>
        </header>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>
              Send an email message to any recipient
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSendMessage}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Email</Label>
                <div className="flex items-center space-x-2 border rounded-md px-3 py-2 bg-background">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="recipient" 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                    placeholder="email@example.com"
                    className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="Message subject"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message Content</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Type your message here..."
                  rows={6}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => {
                setRecipient('');
                setSubject('');
                setMessage('');
              }}>
                Clear
              </Button>
              <Button type="submit" disabled={isSending}>
                {isSending ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>
              Your most recent conversations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  name: 'Alex Johnson', 
                  email: 'alex@example.com', 
                  subject: 'Project Update', 
                  preview: 'I wanted to let you know that the latest project has been updated...',
                  time: '2 hours ago'
                },
                { 
                  name: 'Sarah Lee', 
                  email: 'sarah@example.com', 
                  subject: 'Meeting Notes', 
                  preview: 'Here are the notes from our meeting yesterday...',
                  time: 'Yesterday'
                },
                { 
                  name: 'Michael Chen', 
                  email: 'michael@example.com', 
                  subject: 'New Product Launch', 
                  preview: 'We\'re excited to announce the new product launch...',
                  time: '3 days ago'
                }
              ].map((msg, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{msg.name}</h4>
                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    <p className="font-medium text-sm mt-1">{msg.subject}</p>
                    <p className="text-sm truncate mt-1">{msg.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageTransition>
    </div>
  );
};

export default Messages;
