"use client"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Contribution() {
    const { groupCode } = useParams();
    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const router = useRouter();

    const handleContribution = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/group/${groupCode}/contribution`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount,
                    month,
                    year
                })
            });
            const data = await res.json();
            if (res.ok) {
                router.push(`/group/${groupCode}`)
                console.log(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen w-full relative bg-[#dadada]">
            {/* Dashed Center Fade Grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
                    WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            <div>
                <p>contribution</p>
                <form onSubmit={handleContribution}>
                    <input type="text"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input type="text"
                        onChange={(e) => setMonth(e.target.value)}
                    />
                    <input type="text"
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <button type="submit">Contribute</button>
                </form>
            </div>
        </div>

    )
}