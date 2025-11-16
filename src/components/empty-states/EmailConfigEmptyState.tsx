import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Settings, ArrowRight } from "lucide-react";
interface EmailConfigEmptyStateProps {
  onConfigure: () => void;
}
export const EmailConfigEmptyState = ({
  onConfigure
}: EmailConfigEmptyStateProps) => {
  return <div className="flex items-center justify-center min-h-[calc(100vh-300px)] animate-fade-in px-4">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full overflow-hidden mb-6 bg-card p-4">
            <Mail className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Email Provider Not Connected
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Connect your email service to enable Pascal to send personalized activation emails
          </p>

          
        </div>

        {/* Main Info Card */}
        <Card className="p-8 border-border bg-gradient-subtle mb-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">
                Why Connect Email?
              </h2>
              <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                Pascal uses your email provider to send automated, personalized messages that guide users to activation
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Send AI-generated activation emails automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Track email opens and engagement in user journeys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>Maintain control with review and approval workflow</span>
                </li>
              </ul>

              <Button size="lg" onClick={onConfigure} className="gap-2 bg-gradient-hero hover:opacity-90">
                Configure Email Provider
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Supported Providers Card */}
        <Card className="p-6 border-border">
          <h3 className="font-semibold text-lg mb-4">Supported Email Provider</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">Brevo (formerly Sendinblue)</span>
                <p className="text-xs text-muted-foreground">Free tier available</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>;
};