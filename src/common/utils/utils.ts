interface OrderedEntity {
    order: number;
}

export function getMaxOrder(list: OrderedEntity[]): number {
    return (list?.length ? Math.max(...list.map((item) => item.order)) : -1) + 1
}
