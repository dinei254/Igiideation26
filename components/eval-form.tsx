"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

const questions = [
  "Novelty & Uniqueness",
  "Benefit to Mankind",
  "Commercialization",
  "Status of Invention/Innovation/Design",
  "Video Presentation",
  "Supporting Documents",
];

export default function EvalForm({ projectId }: { projectId: string }) {
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [juryComments, setJuryComments] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  const handleSubmit = () => {
    // Check if all questions are rated
    const unansweredQuestions = questions.filter(
      (question) => !ratings[question]
    );
    if (unansweredQuestions.length > 0) {
      setError(`Please rate all questions: ${unansweredQuestions.join(", ")}`);
      return;
    }

    // Clear error
    setError(null);

    // Calculate the average score
    const scores = Object.values(ratings).map(Number);
    const avgScore = scores.reduce((a, b) => a + b, 0);
    setAverageScore(avgScore);

    // Result object
    const result = {
      project_id: projectId,
      ratings,
      jury_comments: juryComments,
      average_score: avgScore.toFixed(2),
    };
  };

  const handleReviewRubrics = () => {
    const rubricUrl = "/rubrics.pdf";
    window.open(rubricUrl, "_blank");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-4 border-none h-[100vh] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Project Evaluation Form
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-semibold">Project ID:</Label>
          <p className="text-base font-medium">{projectId}</p>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-lg font-semibold">{question}</Label>
            <RadioGroup
              onValueChange={(value) =>
                setRatings((prev) => ({ ...prev, [question]: value }))
              }
              className="flex justify-between"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`${question}-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${question}-${value}`}
                    className="p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium ring-2 ring-transparent peer-data-[state=checked]:ring-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-all hover:bg-muted"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">
            JURY COMMENTS (IF ANY)
          </Label>
          <textarea
            className="w-full p-3 border rounded-md"
            rows={5}
            placeholder="Enter your comments here..."
            value={juryComments}
            onChange={(e) => setJuryComments(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {averageScore !== null && (
          <p className="text-green-600 font-medium">
            Average Score: {averageScore.toFixed(2)}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" onClick={handleReviewRubrics}>
          <FileText className="mr-2 h-4 w-4" />
          Review Rubrics
        </Button>
        <Button onClick={handleSubmit}>Submit Evaluation</Button>
      </CardFooter>
    </Card>
  );
}
