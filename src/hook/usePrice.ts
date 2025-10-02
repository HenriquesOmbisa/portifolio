export function formatKwanza(value: number) {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2
  }).format(value);
}

export function formatPrice(value: string): string {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 0) {
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return numericValue;
  };