// utils/currency.ts
export async function convertUsdToKwanza(amountUsd: number): Promise<number> {
  try {
    const res = await fetch(`https://api.exchangerate.host/convert?from=USD&to=AOA&amount=${amountUsd}`);
    const data = await res.json();
    return data.result; // valor em Kz
  } catch (error) {
    console.error("Erro ao converter moeda:", error);
    return amountUsd * 900; // fallback simples (exemplo: 1 USD ≈ 900 Kz)
  }
}

export function formatCurrency(amount: number, currency: 'USD' | 'AOA') {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'pt-AO', {
    style: 'currency',
    currency,
  }).format(amount);
}