def sum_left_diagonal(matrix):
    matrix_length = len(matrix)
    return sum(matrix[index][index] for index in range(matrix_length))


def sum_right_diagonal(matrix):
    matrix_length = len(matrix)
    return sum(
        matrix[index][(matrix_length - 1) - index]
        for index in range(matrix_length)
    )


def diference_sum_of_diagonals(matrix):
    """Ao receber uma matriz quadrada,
    retorne a diferença entre a soma de suas diagonais."""
    left_diagonal = sum_left_diagonal(matrix)
    right_diagonal = sum_right_diagonal(matrix)
    return left_diagonal - right_diagonal


test_1 = [[1, 2, 3], [4, 5, 6], [9, 8, 9]]
print(diference_sum_of_diagonals(test_1))
