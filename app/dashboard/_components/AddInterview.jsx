"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateInterviewQA } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setIsLoading] = useState(false);
  const [geminiData, setGeminiData] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputPrompt = `Job Position: ${jobPosition} , Job Description: ${jobDesc} , Year of Experience:${jobExperience}.  Based on the above information , provide me ${process.env.NEXT_PUBLIC_REQUIRED_QUESTIONS} interview questions with answer in JSON format.
Give questions and answers as fields in JSON`;

    try {
      setIsLoading(true);
      const response = await generateInterviewQA(inputPrompt);
      let resultText = '';
      for await (const chunk of response) {
        resultText += chunk.text;
      }
      let refinedData = resultText.replace("```json", "").replace("```", "");
      setGeminiData(refinedData);
      setIsLoading(false);

      if (refinedData) {
        const res = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: refinedData,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        }).returning({ mockId: MockInterview.mockId });

        if (res) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${res[0]?.mockId}`);
        }
      } else {
        console.log("error in refined data");
      }
    } catch (error) {
      console.error("Error from Gemini API:", error);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-2xl bg-secondary shadow-sm hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center text-gray-800">
          + Add New
        </h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Tell us more about your job
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Role / Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Description / Tech Stack
                    </label>
                    <Input
                      placeholder="Ex. React, Node.js, MongoDB"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 3"
                      type="number"
                      min="0"
                      max="50"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    className="text-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin w-4 h-4" />
                        Generating...
                      </span>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddInterview;

// export default AddInterview

// // Job Description: Full Stack Developer , Job Description: React , NodeJs ExpressJs MongoDb , JavaScript , Year of Experience:0 Based on the above information , provide me five interview questions with answer in JSON format.
// // Give questions and answers as fields in JSON