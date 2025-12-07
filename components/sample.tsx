"use client";

import { useCurrentAccount, useSignAndExecuteTransaction, useIotaClientQuery } from "@iota/dapp-kit";
import { Button, Container, Heading, Text, Card, Badge, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { Transaction } from "@iota/iota-sdk/transactions";
import { PACKAGE_ID, MODULE_NAME } from "@/lib/config";
import { TrashIcon, HeartFilledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

const SampleIntegration = () => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [taskContent, setTaskContent] = useState("");

  // 1. QUERY DATA
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

  // --- TRANSACTION HANDLERS ---

  // 1. Create Gratitude (Task)
  const createGratitude = () => {
    if (!taskContent) return;
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::create_task`,
      arguments: [tx.pure.string(taskContent)],
    });

    executeTx(tx, "Gratitude sent to the universe! 🌸", () => setTaskContent(""));
  };

  // 2. Cherish (Complete Task)
  const cherishGratitude = (objectId: string) => {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::complete_task`,
      arguments: [tx.object(objectId)],
    });

    executeTx(tx, "Cherished this moment forever! ❤️");
  };

  // 3. Let Go (Delete Task)
  const forgetGratitude = (objectId: string) => {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::delete_task`,
      arguments: [tx.object(objectId)],
    });

    executeTx(tx, "Let go from the stream of memories.");
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
          alert("Error: " + err.message);
        },
      }
    );
  };

  // --- UI RENDER ---

  if (!currentAccount) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50 text-black">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-rose-100">
          <Heading size="8" className="mb-4 text-rose-600">🌸 Chain of Gratitude</Heading>
          <Text size="4" className="text-gray-600">Connect wallet to start your gratitude journey.</Text>
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
    <div className="min-h-screen p-8 bg-rose-50 text-gray-900">
      <Container size="3">
        <Heading size="8" align="center" className="mb-2 text-rose-600 drop-shadow-sm font-serif">
           🌸 Chain of Gratitude
        </Heading>
        <Text align="center" as="p" className="mb-8 text-gray-500 italic">
          "Preserve beautiful moments eternally on the Blockchain"
        </Text>

        {/* INPUT FORM */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-rose-200">
          <Heading size="4" className="mb-4 text-gray-800 font-bold">
            What are you grateful for today?
          </Heading>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input 
                type="text"
                placeholder="Ex: Thank you myself for not giving up..." 
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                className="w-full p-3 border border-rose-200 rounded-lg text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
              />
            </div>
            
            {/* Button */}
            <button 
              onClick={createGratitude} 
              disabled={!taskContent} 
              className={`
                px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center
                ${!taskContent ? 'bg-red-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 active:scale-95 cursor-pointer'}
              `}
            >
              <PaperPlaneIcon className="w-4 h-4 mr-2" />
              SEND GRATITUDE
            </button>
          </div>
        </div>

        {/* LIST */}
        <Heading size="4" mb="4" className="text-gray-800 border-b border-rose-200 pb-2">
          My Gratitude Journal ({tasks.length})
        </Heading>
        
        {isPending ? (
          <Text className="text-gray-500 italic">Listening to the universe...</Text>
        ) : tasks.length === 0 ? (
          <div className="text-center p-8 bg-white rounded border border-dashed border-rose-300">
             <Text className="text-gray-500">No seeds yet. Plant your first one! 🌱</Text>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <Card key={task.id} className={`hover:shadow-md transition-all border ${task.is_done ? 'bg-rose-50 border-rose-300' : 'bg-white border-gray-200'}`}>
                <Flex justify="between" align="center" gap="3">
                  <Flex gap="3" align="center" className="overflow-hidden">
                    {/* Badge */}
                    <Badge color={task.is_done ? "pink" : "cyan"} size="2" variant="solid">
                      {task.is_done ? "Cherished ❤️" : "Just Sent ✨"}
                    </Badge>
                    
                    {/* Content */}
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
                        <HeartFilledIcon /> <span className="hidden sm:inline">Cherish</span>
                      </Button>
                    )}
                    <Button color="red" variant="ghost" onClick={() => forgetGratitude(task.id)} className="cursor-pointer hover:bg-gray-200">
                      <TrashIcon /> <span className="hidden sm:inline">Let Go</span>
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