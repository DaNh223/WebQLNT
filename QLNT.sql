USE [master]
GO
/****** Object:  Database [QLNT]    Script Date: 16/07/2024 7:59:34 SA ******/
CREATE DATABASE [QLNT]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLNT', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\QLNT.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'QLNT_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\QLNT_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [QLNT] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QLNT].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QLNT] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QLNT] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QLNT] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QLNT] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QLNT] SET ARITHABORT OFF 
GO
ALTER DATABASE [QLNT] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [QLNT] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QLNT] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QLNT] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QLNT] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QLNT] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QLNT] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QLNT] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QLNT] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QLNT] SET  ENABLE_BROKER 
GO
ALTER DATABASE [QLNT] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QLNT] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QLNT] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QLNT] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QLNT] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QLNT] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QLNT] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QLNT] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [QLNT] SET  MULTI_USER 
GO
ALTER DATABASE [QLNT] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QLNT] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QLNT] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QLNT] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [QLNT] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [QLNT] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [QLNT] SET QUERY_STORE = ON
GO
ALTER DATABASE [QLNT] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [QLNT]
GO
/****** Object:  Table [dbo].[HinhAnh]    Script Date: 16/07/2024 7:59:35 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhAnh](
	[MaHA] [int] IDENTITY(1,1) NOT NULL,
	[URL] [nvarchar](200) NULL,
	[MaNT] [int] NULL,
 CONSTRAINT [pk_hinhanh] PRIMARY KEY CLUSTERED 
(
	[MaHA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NguoiDung]    Script Date: 16/07/2024 7:59:35 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDung](
	[MaND] [int] IDENTITY(1,1) NOT NULL,
	[TenND] [nvarchar](100) NULL,
	[NgaySinh] [date] NULL,
	[SDT] [nvarchar](100) NULL,
	[Zalo] [nvarchar](200) NULL,
	[Facebook] [nvarchar](200) NULL,
	[LoaiND] [nvarchar](50) NULL,
	[MaTK] [int] NULL,
	[HinhND] [nvarchar](1000) NULL,
	[DiaChi] [nvarchar](200) NULL,
 CONSTRAINT [pk_nguoidung] PRIMARY KEY CLUSTERED 
(
	[MaND] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NhaTro]    Script Date: 16/07/2024 7:59:35 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhaTro](
	[MaNT] [int] IDENTITY(1,1) NOT NULL,
	[TenTro] [nvarchar](100) NULL,
	[DiaChi] [nvarchar](200) NULL,
	[DienTich] [float] NULL,
	[GiaPhong] [money] NULL,
	[GiaDien] [money] NULL,
	[GiaNuoc] [money] NULL,
	[MoTa] [nvarchar](200) NULL,
	[TienIch] [nvarchar](200) NULL,
	[TrangThai] [nvarchar](50) NULL,
	[MaND] [int] NULL,
	[TrangThaiDuyet] [nvarchar](20) NULL,
	[Lng] [nvarchar](100) NULL,
	[Lat] [nvarchar](100) NULL,
	[Tinh] [nvarchar](100) NULL,
	[Quan] [nvarchar](100) NULL,
	[Phuong] [nvarchar](100) NULL,
 CONSTRAINT [pk_nhatro] PRIMARY KEY CLUSTERED 
(
	[MaNT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 16/07/2024 7:59:35 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[MaTK] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](100) NULL,
	[Password] [nvarchar](200) NULL,
 CONSTRAINT [pk_taikhoan] PRIMARY KEY CLUSTERED 
(
	[MaTK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[HinhAnh] ON 

INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (104, N'image92.jpg', 23)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (105, N'image93.jpg', 23)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (106, N'image94.jpg', 23)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (107, N'image95.jpg', 23)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (108, N'image96.jpg', 23)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (111, N'image109.jpg', 21)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (112, N'image110.jpg', 21)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (113, N'image111.jpg', 21)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (114, N'image112.jpg', 21)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (115, N'image113.jpg', 21)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (116, N'image116.jpg', 24)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (117, N'image117.png', 24)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (118, N'image118.jpg', 24)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (119, N'image119.jpg', 25)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (120, N'image120.jpg', 25)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (121, N'image121.jpg', 25)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (122, N'image122.jpg', 25)
INSERT [dbo].[HinhAnh] ([MaHA], [URL], [MaNT]) VALUES (123, N'image123.jpg', 25)
SET IDENTITY_INSERT [dbo].[HinhAnh] OFF
GO
SET IDENTITY_INSERT [dbo].[NguoiDung] ON 

INSERT [dbo].[NguoiDung] ([MaND], [TenND], [NgaySinh], [SDT], [Zalo], [Facebook], [LoaiND], [MaTK], [HinhND], [DiaChi]) VALUES (7, N'Nguyễn Thành Danh', CAST(N'2003-03-22' AS Date), N'0706622303', N'https://zalo.me/0706622303', N'https://www.facebook.com/ntdanh220303', N'CT', 8, N'userImg_7.jpg', N'Sa Đéc')
INSERT [dbo].[NguoiDung] ([MaND], [TenND], [NgaySinh], [SDT], [Zalo], [Facebook], [LoaiND], [MaTK], [HinhND], [DiaChi]) VALUES (8, N'Lê Hoàng Thiện Mỹ', CAST(N'2024-07-03' AS Date), N'1231231231', NULL, NULL, N'CT', 9, NULL, N'Cao Lãnh')
INSERT [dbo].[NguoiDung] ([MaND], [TenND], [NgaySinh], [SDT], [Zalo], [Facebook], [LoaiND], [MaTK], [HinhND], [DiaChi]) VALUES (9, N'Lê Hoàng Thiện Mỹ', CAST(N'2000-01-01' AS Date), N'123123123', NULL, NULL, N'Admin', 10, NULL, NULL)
INSERT [dbo].[NguoiDung] ([MaND], [TenND], [NgaySinh], [SDT], [Zalo], [Facebook], [LoaiND], [MaTK], [HinhND], [DiaChi]) VALUES (10, N'Trần Duy Đăng', CAST(N'2004-08-20' AS Date), N'1231231231', N'', N'', N'CT', 11, N'userImg_10.png', N'Cao Lãnh')
SET IDENTITY_INSERT [dbo].[NguoiDung] OFF
GO
SET IDENTITY_INSERT [dbo].[NhaTro] ON 

INSERT [dbo].[NhaTro] ([MaNT], [TenTro], [DiaChi], [DienTich], [GiaPhong], [GiaDien], [GiaNuoc], [MoTa], [TienIch], [TrangThai], [MaND], [TrangThaiDuyet], [Lng], [Lat], [Tinh], [Quan], [Phuong]) VALUES (21, N'Tấn Nha', N'168 A Ngã Am', 11, 2100000.0000, 2500.0000, 11000.0000, N'No', N'No', N'Còn phòng', 7, N'Đã duyệt', N'105.6347065', N'10.4291123', N'Tỉnh Đồng Tháp', N'Thành phố Cao Lãnh', N'Phường 6')
INSERT [dbo].[NhaTro] ([MaNT], [TenTro], [DiaChi], [DienTich], [GiaPhong], [GiaDien], [GiaNuoc], [MoTa], [TienIch], [TrangThai], [MaND], [TrangThaiDuyet], [Lng], [Lat], [Tinh], [Quan], [Phuong]) VALUES (23, N'Bla Bla', N'123 A, Ngã Am', 10, 700000.0000, 2500.0000, 11000.0000, N'Không', N'Không', N'Còn phòng', 8, N'Đã duyệt', N'105.6347065', N'10.4291123', N'Tỉnh Đồng Tháp', N'Thành phố Cao Lãnh', N'Phường 6')
INSERT [dbo].[NhaTro] ([MaNT], [TenTro], [DiaChi], [DienTich], [GiaPhong], [GiaDien], [GiaNuoc], [MoTa], [TienIch], [TrangThai], [MaND], [TrangThaiDuyet], [Lng], [Lat], [Tinh], [Quan], [Phuong]) VALUES (24, N'Hehehe', N'66 chợ Tân Tịch', 123, 123.0000, 123.0000, 123.0000, N'Không', N'Không', N'Còn phòng', 10, N'Đã duyệt', N'105.6435228', N'10.4547587', N'Tỉnh Đồng Tháp', N'Thành phố Cao Lãnh', N'Phường 3')
INSERT [dbo].[NhaTro] ([MaNT], [TenTro], [DiaChi], [DienTich], [GiaPhong], [GiaDien], [GiaNuoc], [MoTa], [TienIch], [TrangThai], [MaND], [TrangThaiDuyet], [Lng], [Lat], [Tinh], [Quan], [Phuong]) VALUES (25, N'Yến Nhi', N'166 chợ Tân Tịch', 15, 500000.0000, 3000.0000, 11000.0000, N'Không', N'Không', N'Hết phòng', 7, N'Chờ duyệt', N'105.6347065', N'10.4291123', N'Tỉnh Đồng Tháp', N'Thành phố Cao Lãnh', N'Phường 6')
SET IDENTITY_INSERT [dbo].[NhaTro] OFF
GO
SET IDENTITY_INSERT [dbo].[TaiKhoan] ON 

INSERT [dbo].[TaiKhoan] ([MaTK], [Email], [Password]) VALUES (8, N'hetyty345@gmail.com', N'123123123')
INSERT [dbo].[TaiKhoan] ([MaTK], [Email], [Password]) VALUES (9, N'hetyty123@gmail.com', N'123123123')
INSERT [dbo].[TaiKhoan] ([MaTK], [Email], [Password]) VALUES (10, N'thienmy@gmail.com', N'123123123')
INSERT [dbo].[TaiKhoan] ([MaTK], [Email], [Password]) VALUES (11, N'danglun337747@gmail.com', N'123123123')
SET IDENTITY_INSERT [dbo].[TaiKhoan] OFF
GO
ALTER TABLE [dbo].[HinhAnh]  WITH CHECK ADD  CONSTRAINT [fk_nt] FOREIGN KEY([MaNT])
REFERENCES [dbo].[NhaTro] ([MaNT])
GO
ALTER TABLE [dbo].[HinhAnh] CHECK CONSTRAINT [fk_nt]
GO
ALTER TABLE [dbo].[NguoiDung]  WITH CHECK ADD  CONSTRAINT [fk_tk] FOREIGN KEY([MaTK])
REFERENCES [dbo].[TaiKhoan] ([MaTK])
GO
ALTER TABLE [dbo].[NguoiDung] CHECK CONSTRAINT [fk_tk]
GO
ALTER TABLE [dbo].[NhaTro]  WITH CHECK ADD  CONSTRAINT [fk_nd] FOREIGN KEY([MaND])
REFERENCES [dbo].[NguoiDung] ([MaND])
GO
ALTER TABLE [dbo].[NhaTro] CHECK CONSTRAINT [fk_nd]
GO
USE [master]
GO
ALTER DATABASE [QLNT] SET  READ_WRITE 
GO
