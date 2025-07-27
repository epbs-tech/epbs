"use client";

import { useEffect, useState, useRef } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/app/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { LogIn, Settings, LayoutDashboard } from "lucide-react";

export const UserButton = () => {
  const user = useCurrentUser();
  const isAdmin = user?.role === "ADMIN";
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300); // Délai de fermeture pour une meilleure expérience
  };

  // S'assurer que le timeout est nettoyé lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
      className="relative"
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary rounded-full transition-all duration-300 transform hover:scale-110">
            <Avatar className="border-2 border-primary shadow-md">
              <AvatarImage src={user?.image || ""} alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-52 p-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 mt-2 animate-in fade-in slide-in-from-top-5 duration-200"
          align="end"
          forceMount
        >
          {user && (
            <div className="px-2 py-2 mb-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name || "User"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email || ""}</p>
            </div>
          )}

          {isAdmin && (
            <DropdownMenuItem className="flex items-center px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors">
              <Link href="/admin/dashboard" className="flex items-center w-full">
                <LayoutDashboard size={16} className="mr-2 text-primary" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}

          { user && (
              <DropdownMenuItem className="flex items-center px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors">
                <Link href="/settings" className="flex items-center w-full">
                  <Settings size={16} className="mr-2 text-primary" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
          )}

          {!user ? (
            <DropdownMenuItem className="flex items-center px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors">
              <Link href="/auth/login" className="flex items-center w-full">
                <LogIn size={16} className="mr-2 text-primary" />
                <span>Connexion</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <LogoutButton>
              <DropdownMenuItem className="flex items-center px-2 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md cursor-pointer transition-colors">
                <ExitIcon className="h-4 w-4 mr-2" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </LogoutButton>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};