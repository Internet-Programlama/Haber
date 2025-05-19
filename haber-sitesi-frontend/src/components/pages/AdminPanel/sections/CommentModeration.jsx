import React, { useState, useEffect } from "react";
import { Trash2, Check, Clock, Search, Filter, ChevronDown } from "lucide-react";

const USER_ROLES = {
    ADMIN: "admin",
    EDITOR: "editor",
};

export const CommentModeration = ({ userRole = USER_ROLES.ADMIN }) => {
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setComments([
            {
                id: 1,
                author: "Ali Veli",
                content: "Bu haber çok bilgilendirici.",
                date: "2023-05-10T14:30:00",
                status: "approved",
            },
            {
                id: 2,
                author: "Ayşe Yılmaz",
                content: "Görseller eksik, lütfen düzeltin.",
                date: "2023-05-09T10:15:00",
                status: "pending",
            },
            {
                id: 3,
                author: "Mehmet Demir",
                content: "Yazım hataları var, kontrol edilmeli.",
                date: "2023-05-08T16:45:00",
                status: "pending",
            },
            {
                id: 4,
                author: "Zeynep Kaya",
                content: "Çok faydalı bir içerik olmuş, teşekkürler.",
                date: "2023-05-07T09:20:00",
                status: "approved",
            },
        ]);
    }, []);

    const deleteComment = (id) => {
        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    const toggleStatus = (id) => {
        setComments((prev) =>
            prev.map((comment) =>
                comment.id === id
                    ? {
                        ...comment,
                        status: comment.status === "approved" ? "pending" : "approved",
                    }
                    : comment
            )
        );
    };

    const filteredComments = comments.filter((comment) => {
        const matchesSearch =
            comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchTerm.toLowerCase());

        if (statusFilter === "all") return matchesSearch;
        return matchesSearch && comment.status === statusFilter;
    });

    if (![USER_ROLES.ADMIN, USER_ROLES.EDITOR].includes(userRole)) {
        return (
            <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="flex items-center justify-center flex-col">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-red-600 text-2xl font-bold">!</span>
                    </div>
                    <p className="text-red-600 font-medium text-lg">
                        Bu sayfayı görüntüleme yetkiniz yok.
                    </p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5 bg-gray-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Yorum Denetimi</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {userRole === USER_ROLES.ADMIN ? "Admin" : "Editör"} olarak oturum açtınız
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <div className="relative">
                            <div
                                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer shadow-sm hover:border-gray-400"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="flex items-center">
                                    <Filter size={16} className="text-gray-500 mr-2" />
                                    <span className="text-sm">
                                        {statusFilter === "all"
                                            ? "Tüm Yorumlar"
                                            : statusFilter === "approved"
                                                ? "Onaylı Yorumlar"
                                                : "Bekleyen Yorumlar"}
                                    </span>
                                </div>
                                <ChevronDown size={16} className="text-gray-500 ml-2" />
                            </div>
                            {dropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                    <ul>
                                        <li
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setStatusFilter("all");
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            Tüm Yorumlar
                                        </li>
                                        <li
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setStatusFilter("approved");
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            Onaylı Yorumlar
                                        </li>
                                        <li
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setStatusFilter("pending");
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            Bekleyen Yorumlar
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Yorum ara..."
                                className="pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 w-full md:w-64 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
                {filteredComments.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Yorum bulunamadı</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {searchTerm || statusFilter !== "all"
                                ? "Arama kriterlerinize uygun yorum yok."
                                : "Henüz yorum eklenmemiş."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredComments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="bg-white p-5">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium text-gray-900">{comment.author}</h3>
                                                <span className="text-xs text-gray-500 ml-2">
                                                    {formatDate(comment.date)}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-gray-600">{comment.content}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2 self-end sm:self-start">
                                            <button
                                                onClick={() => toggleStatus(comment.id)}
                                                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${comment.status === "approved"
                                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                                    }`}
                                            >
                                                {comment.status === "approved" ? (
                                                    <>
                                                        <Check className="mr-1" size={14} />
                                                        Onaylı
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clock className="mr-1" size={14} />
                                                        Bekliyor
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => deleteComment(comment.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-gray-100"
                                                title="Sil"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-2">
                    <div>
                        Toplam{" "}
                        <span className="font-medium text-gray-700">{filteredComments.length}</span> yorum
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                            <span>
                                Onaylı:{" "}
                                <span className="font-medium text-green-600">
                                    {filteredComments.filter((c) => c.status === "approved").length}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                            <span>
                                Bekleyen:{" "}
                                <span className="font-medium text-yellow-600">
                                    {filteredComments.filter((c) => c.status === "pending").length}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
