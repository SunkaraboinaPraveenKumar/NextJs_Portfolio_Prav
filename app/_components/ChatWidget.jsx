"use client";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ChatWidget = () => {

    return (
        <Link href={"/prav-bot"}>
            <Button
                className="fixed bottom-4 left-4 z-40 p-3 rounded-full shadow-lg bg-gray-400 dark:bg-gray-600 cursor-pointer"
                aria-label="Open Chat"
            >
                <FaCommentDots size={24} />
            </Button>
        </Link>
    );
};

export default ChatWidget;
