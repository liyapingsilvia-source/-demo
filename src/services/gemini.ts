export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 返回模拟回复
  return `这是一条模拟的回复。您刚刚说：“${message}”。由于您要求不调用真实 API，这里返回了预设的文本。`;
}
