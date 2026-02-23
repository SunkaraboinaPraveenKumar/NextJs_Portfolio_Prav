"use client";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ChatWidget = () => {

    return (
        <Link href={"/prav-vector-bot"}>
            <Button
                className="fixed bottom-4 left-4 z-40 p-5 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-all duration-300 hover:scale-110 border border-primary/20"
                aria-label="Open Chat"
            >
                <FaCommentDots size={24} />
            </Button>
        </Link>
    );
};

export default ChatWidget;
