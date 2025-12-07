"use client";

import { useCurrentAccount, useSignAndExecuteTransaction, useIotaClientQuery } from "@iota/dapp-kit";
import { Button, Container, Heading, Text, Card, Badge, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { Transaction } from "@iota/iota-sdk/transactions";
import { PACKAGE_ID, MODULE_NAME } from "@/lib/config";
import { TrashIcon, CheckIcon, HeartFilledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

const SampleIntegration = () => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [taskContent, setTaskContent] = useState("");

  // 1. QUERY DATA (Lấy dữ liệu từ Blockchain)
  const { data: tasksData, refetch, isPending } = useIotaClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount?.address as string,
      filter: { StructType: `${PACKAGE_ID}::${MODULE_NAME}::Task` },
      options: { showContent: true },
    },
    {
      enabled: !!currentAccount,
      refetchInterval: 3000, 
    }
  );

  // --- HÀM XỬ LÝ TRANSACTION ---

  // 1. Gửi lời biết ơn (Thực chất là tạo Task)
  const createGratitude = () => {
    if (!taskContent) return;
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::create_task`,
      arguments: [tx.pure.string(taskContent)],
    });

    executeTx(tx, "Đã gửi lời biết ơn lên vũ trụ! 🌸", () => setTaskContent(""));
  };

  // 2. Khắc ghi/Trân trọng (Thực chất là Complete Task)
  const cherishGratitude = (objectId: string) => {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::complete_task`,
      arguments: [tx.object(objectId)],
    });

    executeTx(tx, "Đã khắc ghi điều này vào tim! ❤️");
  };

  // 3. Buông bỏ/Xóa (Thực chất là Delete Task)
  const forgetGratitude = (objectId: string) => {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::delete_task`,
      arguments: [tx.object(objectId)],
    });

    executeTx(tx, "Đã xóa khỏi dòng chảy ký ức.");
  };

  // Helper function
  const executeTx = (tx: Transaction, successMsg: string, callback?: () => void) => {
    signAndExecuteTransaction(
      { transaction: tx },
      {
        onSuccess: () => {
          alert(successMsg);
          callback?.();
          setTimeout(() => refetch(), 1000);
        },
        onError: (err) => {
          console.error(err);
          alert("Lỗi: " + err.message);
        },
      }
    );
  };

  // --- GIAO DIỆN ---

  if (!currentAccount) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50 text-black">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-rose-100">
          <Heading size="8" className="mb-4 text-rose-600">🌸 Chain of Gratitude</Heading>
          <Text size="4" className="text-gray-600">Kết nối ví để bắt đầu hành trình biết ơn.</Text>
        </div>
      </div>
    );
  }

  const tasks = tasksData?.data?.map((item: any) => {
    const fields = item.data?.content?.fields;
    return {
      id: item.data?.objectId,
      content: fields?.content,
      is_done: fields?.is_done,
    };
  }) || [];

  return (
    // Đổi nền sang màu hồng nhạt (rose-50) cho ấm áp
    <div className="min-h-screen p-8 bg-rose-50 text-gray-900">
      <Container size="3">
        <Heading size="8" align="center" className="mb-2 text-rose-600 drop-shadow-sm font-serif">
           🌸 Chuỗi Biết Ơn (On-Chain)
        </Heading>
        <Text align="center" as="p" className="mb-8 text-gray-500 italic">
          "Lưu giữ những điều tốt đẹp vĩnh cửu trên Blockchain"
        </Text>

        {/* INPUT FORM */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-rose-200">
          <Heading size="4" className="mb-4 text-gray-800 font-bold">
            Hôm nay bạn biết ơn điều gì?
          </Heading>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input 
                type="text"
                placeholder="Ví dụ: Cảm ơn bản thân vì đã không bỏ cuộc..." 
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                className="w-full p-3 border border-rose-200 rounded-lg text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
              />
            </div>
            
            {/* Nút bấm màu Hồng (Rose) */}
            <button 
              onClick={createGratitude} 
              disabled={!taskContent} 
              className={`
                px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center
                ${!taskContent ? 'bg-red-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 active:scale-95 cursor-pointer'}
              `}
            >
              <PaperPlaneIcon className="w-4 h-4 mr-2" /> {/* Icon gửi đi */}
              GỬI LỜI BIẾT ƠN
            </button>
          </div>
        </div>

        {/* LIST */}
        <Heading size="4" mb="4" className="text-gray-800 border-b border-rose-200 pb-2">
          Nhật ký biết ơn của tôi ({tasks.length})
        </Heading>
        
        {isPending ? (
          <Text className="text-gray-500 italic">Đang lắng nghe vũ trụ...</Text>
        ) : tasks.length === 0 ? (
          <div className="text-center p-8 bg-white rounded border border-dashed border-rose-300">
             <Text className="text-gray-500">Chưa có hạt mầm nào. Hãy gieo điều đầu tiên!</Text>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <Card key={task.id} className={`hover:shadow-md transition-all border ${task.is_done ? 'bg-rose-50 border-rose-300' : 'bg-white border-gray-200'}`}>
                <Flex justify="between" align="center" gap="3">
                  <Flex gap="3" align="center" className="overflow-hidden">
                    {/* Badge trạng thái */}
                    <Badge color={task.is_done ? "pink" : "cyan"} size="2" variant="solid">
                      {task.is_done ? "Đã khắc ghi ❤️" : "Mới gửi ✨"}
                    </Badge>
                    
                    {/* Nội dung: Không gạch ngang nữa, mà in đậm/đổi màu */}
                    <Text 
                      size="3" 
                      weight={task.is_done ? "bold" : "medium"}
                      className={`truncate ${task.is_done ? "text-rose-700" : "text-gray-800"}`}
                    >
                      {task.content}
                    </Text>
                  </Flex>

                  <Flex gap="2" shrink="0">
                    {!task.is_done && (
                      <Button color="pink" variant="soft" onClick={() => cherishGratitude(task.id)} className="cursor-pointer">
                        <HeartFilledIcon /> <span className="hidden sm:inline">Khắc ghi</span>
                      </Button>
                    )}
                    <Button color="gray" variant="ghost" onClick={() => forgetGratitude(task.id)} className="cursor-pointer hover:bg-gray-200">
                      <TrashIcon /> <span className="hidden sm:inline">Xóa</span>
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SampleIntegration;